const mongoose = require('mongoose');
const IngredientSchema = require('./Ingredient').schema;
const Schema = mongoose.Schema;

const shoppingListItemSchema = Schema({
    quantity: {
      type: Number,
      required: true
    },
    ingredients: [IngredientSchema]
  }, {
    timestamps: true
  });

  module.exports = mongoose.model('shoppingListItem', shoppingListItemSchema)