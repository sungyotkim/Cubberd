const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientSchema = Schema({
    food: {
      type: String,
      required: true
    },
    foodCategory: {
      type: String
    },
    image: {
      type: String
    },
    foodId: {
      type: String,
      required: true
    }
  }, {
    timestamps: true
  });

  module.exports = mongoose.model('Ingredient', ingredientSchema)


  //types:
  // poultry, red meat, fish, spices, condiments, dairy, vegetables, fruit, legumes, nuts, dried fruit, soy, grains, bread, pasta, oil, vinegar