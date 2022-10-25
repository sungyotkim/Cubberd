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

// const getRecipes = async query => {
//     await Recipe.find({"ingredients.food": {$all: query}})
// }


router.get('/ingredients', async(req, res) => {
    let foods = req.body
    let foodSubsets = []
    for (let i = 0; i < foods.length; i++) {
        for (let j = i + 1; j <= foods.length; j++) {
            let subset = foods.slice(i,j)
            foodSubsets.push(subset)
        }
    }

   foodSubsets.sort((a, b) => a.length > b.length ? -1 : 1);
 
    const numIngredients = foods.length;
    let ingredientScore;
    let recipes = []
    let recipesArr = []
    for (let i = 0; i < foodSubsets.length; i++) {
        let query = foodSubsets[i]
        recipesArr = await Recipe.find({"ingredients.food": {$all: query}})
        ingredientScore = Math.round((query.length / numIngredients) * 100)
        recipesArr.forEach(recipe => {
            if (recipes.length < 3) {
                recipes.push({"ingredientsScore": ingredientScore, "recipe": recipe})
            }
        })
    }

    return res.json(recipes)
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