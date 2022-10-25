const mongoose = require('mongoose');
const IngredientSchema = require('./Ingredient').schema;
const RecipeSchema = require('./Recipe').schema;
const Schema = mongoose.Schema;

const userSchema = Schema({
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    hashedPassword: {
      type: String,
      required: true
    },
    cubberd: [IngredientSchema],
    savedRecipes: {
      favorited: [RecipeSchema],
      planned: [RecipeSchema]
    }
  }, {
    timestamps: true
  });

  module.exports = mongoose.model('User', userSchema)