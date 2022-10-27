require('dotenv').config({path: '../../.env'});

const mongoose = require('mongoose');
const {mongoURI: db} = require('../../config/keys.js');
const Ingredient = require('../Ingredient.js');
const Recipe = require('../Recipe.js');
const ShoppingListItem = require('../ShoppingListItem.js');

const User = require('../User');

mongoose
.connect(db, { useNewUrlParser: true, useUnifiedTopology: true})
.then (() => {
    console.log("Connected to mongoDB successfully")
    })
    .catch (err => {
        console.log(err)
    }) 


let demoUser;
let seedUser;
const seedDB = async () => {
    demoUser = new User({
        username: "demo",
        email: "demo@user.com",
        hashedPassword: "$2a$10$eN5gR5YxMdMNUe9pDEUHY.ongWmotG2PZy3x92KYOXFm9UHGXMoyS"
    })

    const jasmineRice = await Ingredient.findOne({ food: "Jasmine Rice" }).exec();
    const chickenBreast = await Ingredient.findOne({food: "Boneless Skinless Chicken Breast"}).exec();
    const pasta = await Ingredient.findOne({ food: "Pasta" }).exec();
  
    demoUser.cubberd.push(jasmineRice);
    demoUser.cubberd.push(chickenBreast);
    demoUser.cubberd.push(pasta);

    const firstTwentyRecipes = await Recipe.find().sort({'createdAt': 1}).limit(20);
    const lastTwentyRecipes = await Recipe.find().sort({'createdAt': -1}).limit(20);
    demoUser.savedRecipes.favorited = firstTwentyRecipes;
    demoUser.savedRecipes.planned = lastTwentyRecipes;

    const mushrooms = await Ingredient.findOne({food: "Mushrooms" }).exec();
    const celery = await Ingredient.findOne({food: "Celery" }).exec();
    const shoppingListItem1 = new ShoppingListItem({ quantity: 4, ingredient: mushrooms })
    const shoppingListItem2 = new ShoppingListItem({ quantity: 4, ingredient: celery })
    await shoppingListItem1.save();
    await shoppingListItem2.save();

    demoUser.shoppingList.push(shoppingListItem1);
    demoUser.shoppingList.push(shoppingListItem2);
    seedUsers = [demoUser];

    await ShoppingListItem.deleteMany();
    await User.deleteMany();
    await User.insertMany(seedUsers);
}
seedDB() 
    .then(() => {
        console.log('All users and ShoppingListItems deleted, demo user created');
        mongoose.connection.close();
    });