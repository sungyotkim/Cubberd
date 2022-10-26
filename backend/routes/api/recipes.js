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

router.get('/:recipeId', async(req, res, next) => {
    const recipe = await Recipe.findById(req.params(recipeId))
    return res.json(recipe)
})

//get by multiple ingredients 

const getRecipes = query => Recipe.find({"ingredients.food": {$all: query}})

router.get('/ingredients', async(req, res) => {
    const foods = req.body
    const numQueryIngredients = foods.length;
        
    let foodSubsets = []
    for (let i = 0; i < foods.length; i++) {
        for (let j = i + 1; j <= foods.length; j++) {
            let subset = foods.slice(i,j)
            foodSubsets.push(subset)
        }
    }
    
    foodSubsets.sort((a, b) => a.length > b.length ? -1 : 1);
    
    let ingredientScore;
    let shoppingScore;
    let recipesByIngredientScore = []
    let recipesByShoppingScore = []
    let recipesQuery = []
    let recipes = []
    for (let i = 0; i < foodSubsets.length; i++) {
        let query = foodSubsets[i]
        // recipesArr = await Recipe.find({"ingredients.food": {$all: query}})
        recipesQuery = await getRecipes(query)
        ingredientScore = Math.round((query.length / numQueryIngredients) * 100)
        recipesQuery.forEach(recipe => {
            shoppingScore = Math.round((query.length / recipe.ingredients.length) * 100);
            if (recipesByIngredientScore.length < 3) {
                recipesByIngredientScore.push({"ingredientsScore": ingredientScore, "shoppingScore": shoppingScore, "recipe": recipe})
            }
            recipesByShoppingScore.push({"ingredientsScore": ingredientScore, "shoppingScore": shoppingScore, "recipe": recipe})
        })
    }

    //recipes.push(recipesByIngredientScore)
    recipesByShoppingScore.sort((a, b) => {a.shoppingScore > b.shoppingScore ? -1 : 1})
    recipes.push(recipesByIngredientScore, recipesByShoppingScore.slice(0,4))
    console.log(recipes.length)

    // for (let i = 0; i < foodSubsets.length; i ++) {
    //     let query = foodSubsets[i]
    //     recipesQuery = await getRecipes(query)
    //     recipesQuery.forEach(recipe => {
    //         shoppingScore = Math.round((query.length / recipe.ingredients.length) * 100);
    //         recipes.push({"shoppingScore": shoppingScore, "recipe": recipe})
    //     })
    //     recipes.sort((a, b) => a.shoppingScore > b.shoppingScore ? -1 : 1)
    //     console.log("sorted recipes")
    //     console.log(recipes)
    // }

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