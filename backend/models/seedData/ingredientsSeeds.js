require('dotenv').config();

const mongoose = require('mongoose');
const Ingredient = require('../Ingredient');
const {mongoURI: db} = require('../../config/keys.js');

mongoose
.connect(db, { useNewUrlParser: true, useUnifiedTopology: true})
.then (() => {
    console.log("Connected to mongoDB successfully")
    })
    .catch (err => {
        console.log(err)
    }) 
    
const seedIngredients = [
    {
        name: 'salt',
        type: 'spices',
        imageUrl: ''
    },
    { 
        name: 'pepper',
        type: 'spices',
        imageUrl: ''
    },
    {
        name: 'olive oil',
        type: 'oil',
        imageUrl: ''
    }, {
        name: 'flour',
        type: 'baking',
        imageUrl: ''
    },
    {
        name: 'granulated sugar',
        type: 'baking',
        imageUrl: ''
    }, 
    {
        name: 'chicken broth',
        type: 'canned',
        imageUrl: '' 
    }, 
    {
        name: 'beef broth',
        type: 'canned',
        imageUrl: ''
    }, 
    {
        name: 'canned tomatoes',
        type: 'canned',
        imageUrl: ''
    },
    {
        name: 'tomato sauce',
        type: 'canned',
        imageUrl: ''
    },
    {
        name: 'tomato paste',
        type: 'canned',
        imageUrl: ''
    }, 
    {
        name: 'canned beans',
        type: 'legumes',
        imageUrl: ''
    },
    {
        name: 'canned tuna',
        type: 'fish',
        imageUrl: ''
    },
    {
        name: 'spaghetti',
        type: 'pasta',
        imageUrl: ''
    },
    {
        name: 'penne',
        type: 'pasta',
        imageUrl: ''
    },
    {
        name: 'rigatoni',
        type: 'pasta',
        imageUrl: ''
    },
    {
        name: 'ravioli',
        type: 'pasta',
        imageUrl: ''
    },
    {
        name: 'ziti',
        type: 'pasta',
        imageUrl: ''
    },
    {
        name: 'angel hair',
        type: 'pasta',
        imageUrl: ''
    },
    {
        name: 'linguine',
        type: 'pasta',
        imageUrl: ''
    },
    {
        name: 'pasta',
        type: 'pasta',
        imageUrl: ''
    },
    {
        name: 'white rice',
        type: 'rice',
        imageUrl: ''
    },
    {
        name: 'jasmine rice',
        type: 'rice',
        imageUrl: ''
    },
    {
        name: 'basmati rice',
        type: 'rice',
        imageUrl: ''
    },
    {
        name: 'brown rice',
        type: 'rice',
        imageUrl: ''
    },
    {
        name: 'potatoes',
        type: 'vegetables',
        imageUrl: ''
    },
    {
        name: 'onions',
        type: 'alliums',
        imageUrl: ''
    },
    {
        name: 'garlic',
        type: 'alliums',
        imageUrl: ''
    },
    {
        name: 'scallions',
        type: 'alliums',
        imageUrl: ''
    }, 
    {
        name: 'shallot',
        type: 'alliums',
        imageUrl: ''
    },
    {
        name: 'leek',
        type: 'allium',
        imageUrl: ''
    },
    {
        name: 'chives',
        type: 'allium',
        imageUrl: ''
    },
    {
        name: 'balsamic vinegar',
        type: 'vinegar',
        imageUrl: ''
    },
    {
        name: 'apple cider vinegar',
        type: 'vinegar',
        imageUrl: ''
    },
    {
        name: 'red wine vinegar',
        type: 'vinegar',
        imageUrl: ''
    }, 
    {
        name: 'soy sauce',
        type: 'condiments',
        imageUrl: ''
    }, 
    {
        name: 'sesame oil',
        type: 'condiments',
        imageUrl: ''
    },
    {
        name: 'worcestershire sauce',
        type: 'condiments',
        imageUrl: ''
    },
    {
        name: 'hot sauce',
        type: 'condiments',
        imageUrl: ''
    }, 
    {
        name: 'dried basil',
        type: 'spices',
        imageUrl: ''
    }, 
    {
        name: 'bay leaves',
        type: 'spices',
        imageUrl: ''
    }, 
    {
        name: 'cayenne peppers',
        type: 'spices',
        imageUrl: ''
    },
    {
        name: 'red pepper flakes',
        type: 'spices',
        imageUrl: ''
    }, 
    {
        name: 'chili powder',
        type: 'spices',
        imageUrl: ''
    },
    {
        name: 'cumin',
        type: 'spices',
        imageUrl: ''
    }, 
    {
        name: 'cinnamon',
        type: 'spices',
        imageUrl: ''
    },
    {
        name: 'coriander',
        type: 'spices',
        imageUrl: ''
    }, 
    {
        name: 'garlic powder',
        type: 'spices',
        imageUrl: ''
    },
    {
        name: 'onion powder',
        type: 'spices',
        imageUrl: ''
    }, 
    {
        name: 'oregano',
        type: 'spices',
        imageUrl: ''
    },
    {
        name: 'paprika',
        type: 'spices',
        imageUrl: ''
    },
    {
        name: 'dried parsley',
        type: 'spices',
        imageUrl: ''
    },
    {
        name: 'terragon ',
        type: 'spices',
        imageUrl: ''
    },
    {
        name: 'oregano',
        type: 'spices',
        imageUrl: ''
    },
    {
        name: 'thyme',
        type: 'spices',
        imageUrl: ''
    },
    {
        name: 'sage',
        type: 'spices',
        imageUrl: ''
    },
    {
        name: 'cilantro',
        type: 'herbs',
        imageUrl: ''
    },
    {
        name: 'parsley',
        type: 'herbs',
        imageUrl: ''
    },
    {
        name: 'basil',
        type: 'herbs',
        imageUrl: ''
    }, 
    {
        name: 'mint',
        type: 'herbs',
        imageUrl: ''
    },
    {
        name: 'dill',
        type: 'herbs',
        imageUrl: ''
    },
    {
        name: 'eggs',
        type: 'dairy',
        imageUrl: ''
    },
    {
        name: 'milk',
        type: 'dairy',
        imageUrl: ''
    },
    {
        name: 'soy milk',
        type: 'dairy alternatives',
        imageUrl: ''
    },
    {
        name: 'almond milk',
        type: 'dairy alternatives',
        imageUrl: ''
    },
    {
        name: 'butter',
        type: 'dairy',
        imageUrl: ''
    },
    {
        name: 'cream cheese',
        type: 'dairy',
        imageUrl: ''
    },
    {
        name: 'ketchup',
        type: 'condiments',
        imageUrl: ''
    },
    {
        name: 'mustard',
        type: 'condiments',
        imageUrl: ''
    },
    {
        name: 'mustard',
        type: 'condiments',
        imageUrl: ''  
    },
    {
        name: 'parmesan cheese',
        type: 'condiments',
        imageUrl: ''
    },
    {
        name: 'corn',
        type: 'vegetables',
        imageUrl: ''
    },
    {
        name: 'spinach',
        type: 'vegetables',
        imageUrl: ''
    },
    {
        name: 'peas',
        type: 'vegetables',
        imageUrl: ''
    },
    {
        name: 'ground beef',
        type: 'red meat',
        imageUrl: ''
    },
    {
        name: 'chicken breasts',
        type: 'poultry',
        imageUrl: ''
    },
    {
        name: 'chicken thighs',
        type: 'poultry',
        imageUrl: ''
    },
    {
        name: 'chicken wings',
        type: 'poultry',
        imageUrl: ''
    },
    {
        name: 'ginger',
        type: 'spices',
        imageUrl: ''
    },
    {
        name: 'rosemary',
        type: 'spaces',
        imageUrl: ''
    },
    {
        name: 'lemon',
        type: 'citrus',
        imageUrl: ''
    },
    {
        name: 'vanilla extract',
        type: 'baking',
        imageUrl: ''
    },
    {
        name: 'kosher salt',
        type: 'baking',
        imageUrl: ''
    },
    {
       name: 'cornstarch',
       type: 'baking',
       imageUrl: ''
    },
    {
        name: 'confectioners sugar',
        type: 'baking',
        imageUrl: ''
    },
    {
        name: 'cloves',
        type: 'spices',
        imageUrl: ''
    }, 
    {
        name: 'honey',
        type: 'condiments',
        imageUrl: ''
    },
    {
        name: 'brown sugar',
        type: 'baking',
        imageUrl: ''
    },
    {
        name: 'canola oil',
        type: 'oil',
        imageUrl: ''
    }, 
    {
        name: 'white vinegar',
        type: 'vinegar',
        imageUrl: ''
    }, 
    {
        name: 'rice vinegar',
        type: 'vinegar',
        imageUrl: ''
    },
    {
        name: 'dijon mustard',
        type: 'condiments',
        imageUrl: ''
    }, 
    {
        name: 'chili paste',
        type: 'condiments',
        imageUrl: ''
    }, 
    {
        name: 'black peppercorns',
        type: 'spices',
        imageUrl: ''
    }, 
    {
        name: 'nutmeg',
        type: 'spices',
        imageUrl: ''
    },
    {
        name: 'italian seasoning',
        type: 'spices',
        imageUrl: ''
    },
    {
        name: 'chickpeas',
        type: 'legumes',
        imageUrl: ''
    },
    {
        name: 'olives',
        type: 'vegetables',
        imageUrl: ''
    },
    {
        name: 'peanut butter',
        type: 'condiments',
        imageUrl: ''
    },
    {
        name: 'jelly',
        type: 'condiments',
        imageUrl: ''
    },
    {
        name: 'salsa',
        type: 'condiments',
        imageUrl: ''
    },
    {
        name: 'breadcrumbs',
        type: 'baking',
        imageUrl: ''
    },
    {
        name: 'oats',
        type: 'grains',
        imageUrl: ''
    },
    {
        name: 'baking soda',
        type: 'baking',
        imageUrl: ''
    },
    {
        name: 'baking powder',
        type: 'baking',
        imageUrl: ''
    }, 
    {
        name: 'yogurt',
        type: 'dairy',
        imageUrl: ''
    },
    {
        name: 'apple',
        type: 'fruit',
        imageUrl: ''
    },
    {
        name: 'banana',
        type: 'fruit',
        imageUrl: ''
    },
    {
        name: 'peach',
        type: 'fruit',
        imageUrl: ''
    },
    {
        name: 'nectarine',
        type: 'fruit',
        imageUrl: ''
    },
    {
        name: 'kiwi',
        type: 'fruit',
        imageUrl: ''
    },
    {
        name: 'date',
        type: 'dried fruit',
        imageUrl: ''
    }, {
        name: 'plum',
        type: 'fruit',
        imageUrl: ''
    },
    {
        name: 'almonds',
        type: 'nuts',
        imageUrl: ''
    },
    {
        name: 'cashews',
        type: 'nuts',
        imageUrl: ''
    },
    {
        name: 'apricot',
        type: 'fruit',
        imageUrl: ''
    },
    {
        name: 'dried apricot',
        type: 'dried fruit',
        imageUrl: ''
    },
    {
        name: 'peanuts',
        type: 'nuts',
        imageUrl: ''
    }
];

const seedDB = async () => {
    await Ingredient.deleteMany({});
    await Ingredient.insertMany(seedIngredients);
};

seedDB().then(() => {
    mongoose.connection.close();
});
