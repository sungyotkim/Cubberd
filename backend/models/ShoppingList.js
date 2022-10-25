const mongoose = require('mongoose');
const IngredientSchema = require('./Ingredient').schema;
const RecipeSchema = require('./Recipe').schema;
const Schema = mongoose.Schema;

const shoppingListSchema = Schema({
    quantity: {
      type: Number,
      required: true
    },
    ingredients: [IngredientSchema]
  }, {
    timestamps: true
  });

  module.exports = mongoose.model('ShoppingList', shoppingListSchema)