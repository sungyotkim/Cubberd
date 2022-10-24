const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Ingredient = mongoose.model('Ingredient');

// Index
router.get('/', async (req, res, next) => {
  const allIngredients = await Ingredient.find().sort({ name: 1 });
  return res.json(allIngredients);
})

// By name
router.get('/:ingredientName'), async (req, res, next) => {
  const ingredients = await Ingredient.find({ name: req.params.ingredientName });
  return res.json(ingredients);
}