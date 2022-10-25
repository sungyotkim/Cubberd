const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const mongoose = require('mongoose');
const Ingredient = mongoose.model('Ingredient');
const Recipe = mongoose.model('Recipe')

router.get('/', async (req, res) => {
    const allRecipes = await Recipe.find();
    return res.json(allRecipes);
});

router.get('/test', async(req, res, next) => {
    const recipes = await Recipe.find().limit(5);
    return res.json(recipes)
})

//get by multiple ingredients 
router.get('/ingredients', async(req, res) => {
    let foods = req.body
    const numIngredients = foods.length;
    let ingredientScore;
    let recipesArr; 
    let recipes = []
    while (foods.length >= 1) {
        ingredientScore = Math.round((foods.length / numIngredients)) * 100
        recipesArr = await Recipe.find ({"ingredients.food": {$all: foods}})
        recipesArr.forEach(recipe => {
            recipes.push({"ingredientScore": ingredientScore, "recipe": recipe})
        })
        foods = foods.slice(0, -1)
    }
    console.log("recipes")
    console.log(recipes)
    return res.json(recipesArr)
})

router.post('/', async (req, res) => {
    const newRecipe = new Recipe({
        uri: req.body.uri,
        label: req.body.label,
        image: req.body.image,
        source: req.body.source,
        url: req.body.url,
        source: req.body.source,
        yield: req.body.yield,
        dietLabels: req.body.dietLabels,
        healthLabels: req.body.healthLabels,
        cautions: req.body.cautions,
        ingredientLines: req.body.ingredientLines,
        ingredients: req.body.ingredients,
        calories: req.body.calories,
        totalWeight: req.body.totalWeight,
        totalTime: req.body.totalTime,
        cuisineType: req.body.cuisineType,
        mealType: req.body.mealType,
        dishType: req.body.dishType,
        totalNutrients: req.body.totalNutrients
    })

    const recipe = await newRecipe.save();
    return res.json(recipe);
})

module.exports = router;