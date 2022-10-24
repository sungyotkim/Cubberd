const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = Schema({
    uri: {
        type: String
    },
    label: {
        type: String
    },
    image: {
        type: String
    },
    source: {
        type: String
    },
    url: {
        type: String
    },
    yield: {
        type: Number
    },
    dietLabels: {
        type: Array
    },
    healthLabels: {
        type: Array
    },
    cautions: {
        type: Array
    },
    ingredientLines: {
        type: Array
    },
    ingredients: {
        type: Array
    },
    calories: {
        type: Number
    },
    totalWeight: {
        type: Number
    },
    totalTime: {
        type: Number
    },
    cuisineType: {
        type: Array
    },
    mealType: {
        type: Array
    },
    dishType: {
        type: Array
    },
    totalNutrients: {
        type: Object
    },
    totalDaily: {
        type: Object
    },
    digest: {
        type: Array
    }
    
}, {
    timestamps: true
});

module.exports = mongoose.model('Recipe', recipeSchema)