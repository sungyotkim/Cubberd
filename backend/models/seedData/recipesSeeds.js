require('dotenv').config({path: '../../.env'});

const mongoose = require('mongoose');
const {mongoURI: db} = require('../../config/keys.js');

const Ingredient = require('../Ingredient');
const Recipe = require('../Recipe');
const recipeArr = require('./recipeArr');

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true})
  .then (() => {
      console.log("Connected to mongoDB successfully")
      })
  .catch (err => {
      console.log(err)
  }) 

const nestedRecipes = recipeArr;

// EACH ENTRY IS A KEY VALUE PAIR
// { "recipe": recipeObj }
// must key into "recipe" to get the recipeObj

const seedRecipes = [];
let seedIngredientsHash = {};

nestedRecipes.forEach(nestedRecipe => {
  const recipeObject = nestedRecipe.recipe;
  seedRecipes.push(recipeObject);

  recipeObject.ingredients.forEach(ingredient => {
    const foodNameArr = ingredient.food.split(" ");
    
    for (let i = 0; i < foodNameArr.length; i++) {
      foodNameArr[i] = foodNameArr[i][0].toUpperCase() + foodNameArr[i].substr(1);
    }    

    const newFoodName = foodNameArr.join(" ");
    const newIngredient = {
      food: newFoodName,
      foodCategory: ingredient.foodCategory,
      image: ingredient.image,
      foodId: ingredient.foodId
    };

   seedIngredientsHash[newIngredient.foodId] = newIngredient;
  })
})

seedIngredients = Object.values(seedIngredientsHash);


const seedDB = async () => {
  // await Ingredient.deleteMany({});
  // await Ingredient.insertMany(seedIngredients);
  // await Recipe.deleteMany({});
  // await Recipe.insertMany(seedRecipes);
};

seedDB().then(() => {
  mongoose.connection.close();
});
