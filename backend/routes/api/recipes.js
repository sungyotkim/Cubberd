const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const mongoose = require('mongoose');
const Ingredient = mongoose.model('Ingredient');
const Recipe = mongoose.model('Recipe')

router.get('/', async (req, res, next) => {
    const allRecipes = await Recipe.find();
    return res.json(allRecipes);
});

// get by ingredients
router.get('/ingredients', async(req, res, next) => {
    const ingredient = await Ingredient.find(req.body);
    const recipe = await Recipe.find({"ingredients.foodId": `${ingredient.foodId}`});
    return res.json(recipe)
})
// router.get('/', async (req, res, next) => {
//     let recipes;
//     try {
//         recipes = Recipe.find({"ingredients": {$in: [req.body]}})
//     }
// });

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