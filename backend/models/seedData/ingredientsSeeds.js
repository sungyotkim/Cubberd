const mongoose = require('mongoose');
const Ingredient = require('../Ingredient');

const seedIngredients = [
    {
        name: 'salt',
        type: 'spices',
        imageUrl: ""
    },
    { 
        name: 'pepper',
        type: 'spices',
        imageUrl: ""
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
    
    



    
    
    

];
