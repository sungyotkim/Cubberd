const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientSchema = Schema({
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    }
  }, {
    timestamps: true
  });

  module.exports = mongoose.model('Ingredient', ingredientSchema)


  //types:
  // poultry, red meat, fish, spices, condiments, dairy, vegetables, fruit, legumes, nuts, dried fruit, soy, grains, bread, pasta, oil, vinegar