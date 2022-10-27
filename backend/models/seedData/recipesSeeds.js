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

const capitalizeName = (string) => {
  const foodNameArr = string.split(" ");
  for (let i = 0; i < foodNameArr.length; i++) {
    foodNameArr[i] = foodNameArr[i][0].toUpperCase() + foodNameArr[i].substr(1);
  }    
  return foodNameArr.join(" ");
}

nestedRecipes.forEach(nestedRecipe => {
  const recipeObject = nestedRecipe.recipe;

  recipeObject.ingredients.forEach(ingredient => {
    
    const newFoodName = capitalizeName(ingredient.food);
    const newIngredient = {
      food: newFoodName,
      foodCategory: ingredient.foodCategory,
      image: ingredient.image,
      foodId: ingredient.foodId
    };
    if (newIngredient.image === null) {
      switch (newIngredient.food) {
        case "Rendered Chicken Fat": 
          newIngredient.image = "https://images.heb.com/is/image/HEBGrocery/000168024";
          break;
        case "Crushed Tomatoes":
          newIngredient.image = "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRhL5bzu6VoYW5bV8G2M8UXjP595VkuxaCJgJDpTo6TDbanJS74beZFVTQQ7x3L-ZaOFYuDeczVSHPEfl5CgmQEDc1SDDpA&usqp=CAE";
          break;
        case "Polenta":
          newIngredient.image = "https://cdn.loveandlemons.com/wp-content/uploads/2020/02/polenta.jpg";
          break;
        case "Pam":
          newIngredient.image = "https://m.media-amazon.com/images/I/51ihv1zrAmS.jpg";
          break;
        case "Tomato Sauce":
          newIngredient.image = "https://www.seriouseats.com/thmb/rlK8y8KJegOzRYYDpwlr-yDydc8=/1500x1125/filters:fill(auto,1)/the-best-slow-cooked-italian-american-tomato-sauce-red-sauce-recipe-step-09-05ad7578f9d34a5092086ae959bea8a7.jpg";
          break;
        case "Ground Flax":
          newIngredient.image = "https://m.media-amazon.com/images/I/61IIIPUDd1L.jpg";
          break;
        case "Oats":
          newIngredient.image = "https://cdn1.sph.harvard.edu/wp-content/uploads/sites/30/2018/03/oats-701299_1920.jpg";
          break;
        case "Nutritional Yeast":
          newIngredient.image = "https://cdn.loveandlemons.com/wp-content/uploads/2021/04/what-is-nutritional-yeast.jpg";
          break;
        case "Dried Mustard":
          newIngredient.image = "https://www.myspicer.com/wp-content/uploads/2014/12/uses-for-dry-mustard.png";
          break;
        case "Winter Squash":
          newIngredient.image = "https://assets.epicurious.com/photos/5893bf1aeb3e360a3e384090/master/w_2000,h_1333,c_limit/butternut-squash-020217.jpg";
          break;
        case "Asafetida":
          newIngredient.image = "https://m.media-amazon.com/images/I/71IvC4hwz7L.jpg";
          break;
        case "Chat Masala":
          newIngredient.image = "https://m.media-amazon.com/images/I/716mHetqbGL.jpg";
          break;
        case "Seitan":
          newIngredient.image = "https://www.connoisseurusveg.com/wp-content/uploads/2015/07/how-to-make-seitan-9-of-10.jpg";
          break;
        case "Turkey Necks":
          newIngredient.image = "https://petparlour.ie/wp-content/uploads/2020/10/Raw-Turkey-Necks-Frozen.jpeg";
          break;
        case "Turkey Fat":
          newIngredient.image = "https://thumbs.dreamstime.com/b/fat-black-turkey-red-snood-his-head-158360904.jpg";
          break;
        case "https://thumbs.dreamstime.com/b/fat-black-turkey-red-snood-his-head-158360904.jpg":
          newIngredient.image = "https://m.media-amazon.com/images/I/41PQTi0k7VL.jpg";
          break;
        case "Fruit":
          newIngredient.image = "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/assortment-of-colorful-ripe-tropical-fruits-top-royalty-free-image-995518546-1564092355.jpg";
          break;
        case "Coconut Aminos":
          newIngredient.image = "https://cdn.shopify.com/s/files/1/0242/1866/5056/products/FM199BI341_SVCBOCLA10_IMD.png?v=1639624865";
          break;
        case "Lamb Neck":
          newIngredient.image = "https://www.shepherdsongfarm.com/wp-content/uploads/2020/12/Sliced-Lamb-Neck-3.jpg";
          break;
        case "Lamb Shanks":
          newIngredient.image = "https://www.shepherdsongfarm.com/wp-content/uploads/2012/09/Lamb-Shanks-1.jpg";
          break;
        case "Panko":
          newIngredient.image = "https://m.media-amazon.com/images/I/81fer2Xw7RS.jpg";
          break;
        case "Oxtails":
          newIngredient.image = "https://www.centralmeats.com/pub/media/catalog/product/cache/image/600x430/e9c3970ab036de70892d86c6d221abfe/o/x/oxtails.jpg";
          break;
        case "Vegetable Broth":
          newIngredient.image = "http://contenthandler.azureedge.net/recp/477/2000/0/444.jpg";
          break;
        case "Cookie Crumbs":
          newIngredient.image = "https://associationsnow.com/wp-content/uploads/2018/02/GettyImages-885134872.jpg";
          break;
        case "Jelly":
          newIngredient.image = "https://media.istockphoto.com/photos/jelly-on-a-plate-3d-rendering-isolated-on-white-background-picture-id1056477498?k=20&m=1056477498&s=170667a&w=0&h=BZnb28BulzFtgW4qXGqGtIuFew9GMGnoNcfw7e8m_JY=";
          break;
        case "Can Of Chickpeas":
          newIngredient.image = "https://target.scene7.com/is/image/Target/GUEST_aab59635-53ff-4f74-a8b0-603021196498?wid=488&hei=488&fmt=pjpeg";
          break;
        default:
          newIngredient.image = "https://media-exp1.licdn.com/dms/image/D4E03AQE6zongzg-HUQ/profile-displayphoto-shrink_400_400/0/1666311882598?e=1672272000&v=beta&t=mgQlRPS2tNY5M8r3Lk1A1tJfDKAtGsfo-hbl0AWH7jY";
      }
    }
    seedIngredientsHash[newIngredient.foodId] = newIngredient;

    ingredient.food = newFoodName;
  })
  seedRecipes.push(recipeObject);
})
seedIngredients = Object.values(seedIngredientsHash);

const firstTwentyImages = [
  'https://www.seriouseats.com/thmb/TozLHcn8mlaeLpLpMc-jONCOLEU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2011__12__20111215-dt-chicken-vesuvio-primary-e81c59ea0ba74ab38c6722b7802eb0f1.jpg',
  'https://norecipes.com/wp-content/uploads/2015/01/chicken-paprikash-sq-250x250.jpg',
  'https://assets.bonappetit.com/photos/57d86edf9321384c4e3c9899/16:9/w_2560,c_limit/google-braised-chicken-and-kale.jpg',
  'https://images.food52.com/QsMxhy3cRu5kS21xxvaQLWS38qY=/1008x672/filters:format(webp)/85b4fbe7-d87a-4214-9d24-73e66236c33b--chicken.jpg',
  'https://www.saveur.com/uploads/2019/03/18/4VT3T3R77CQ3FAFYGRNWUUQ3VA.jpg?auto=webp&auto=webp&optimize=high&quality=70&width=1920',
  'https://www.saveur.com/uploads/2020/01/14/WF73RXBGKNEXFNHEGGFQFOEUZM.jpg?auto=webp&auto=webp&optimize=high&quality=70&width=1920',
  'https://theforkedspoon.com/wp-content/uploads/2022/03/White-Chicken-Chili-8-500x500.jpg.webp',
  'https://user-images.immediate.co.uk/bbcgoodfood/recipes/user-recipe/persianchicken_4.jpg?quality=90&webp=true&resize=300,272',
  'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/chickenalocacciatore_70349_16x9.jpg',
  'https://assets.epicurious.com/photos/62f16ed5fe4be95d5a460eed/1:1/w_1920,c_limit/RoastChicken_RECIPE_080420_37993.jpg',
  'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fassets.marthastewart.com%2Fstyles%2Fwmax-300%2Fd12%2Fmain_01273_t%2Fmain_01273_t_xl.jpg%3Fitok%3DyA_urosw&q=60',
  'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/sweet-potato-crisps-714f240.jpg?quality=90&webp=true&resize=300,272',
  'https://images.food52.com/EBwlxteP2pPvmQTLv35PhVehIIY=/1008x672/filters:format(webp)/9f91df41-e6ce-4f77-8c27-387fc9d16979--Sweet-Potato-Banana-Smoothie.jpg',
  'https://www.southernliving.com/thmb/kV9szfXJkt_i4XVzfFzLoHTkR-8=/2000x2000/filters:no_upscale()/2636201_Thank_Spread0002_Crispy-Potato-Galette-2000-d3f2f7b88da94a0a8279e7cf684e65bb.jpg',
  'https://www.simplyrecipes.com/thmb/pbBAiFogfE_8fySkf4TriAqAzRg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2016__01__potato-bread-vertical-a-1600-3e9af0a6fdaf4448a76900c15e6b0b4e.jpg',
  'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/sweetpotatowedges_83345_16x9.jpg',
  'https://assets.epicurious.com/photos/5612e62ace6afd7f75653e46/1:1/w_1920,c_limit/102282.jpg',
  'https://i0.wp.com/smittenkitchen.com/wp-content/uploads//2015/12/23422902976_b1b17d03a6_k.jpg?fit=750%2C500&ssl=1',
  'https://irepo.primecp.com/2016/03/268154/recipe-17984_Large500_ID-1515818.jpg?v=1515818',
  'https://i0.wp.com/post.greatist.com/wp-content/uploads/sites/2/2021/09/10886_sweet_potato_biscuits.png?w=1575'
];
const lastTwentyImages = [
  'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fassets.marthastewart.com%2Fstyles%2Fwmax-300%2Fd12%2Fmain_00493_t%2Fmain_00493_t_xl.jpg%3Fitok%3Dn_X_mCZm&q=60',
  'https://chezus.com/wp-content/uploads/2009/04/beef-and-noodles-1-0309.jpg.webp',
  'https://hips.hearstapps.com/hmg-prod/images/braised-beef-brisket-1597688271.jpg?crop=0.451xw:1.00xh;0.340xw,0&resize=1200:*',
  'https://img.jamieoliver.com/jamieoliver/recipe-database/46265732.jpg?tr=w-800,h-1066',
  'https://images.food52.com/lSm2JxC8Q0t8lloP8zWWc3WRiRA=/1008x672/filters:format(webp)/b9843ad4-2c4e-4727-9be2-8035df38dc97--IMG_0399.JPG',
  'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-560511_12-75161e9.jpg?quality=90&webp=true&resize=300,272',
  'https://www.realsimple.com/thmb/b17W0UAWvVCnaFX2tnopOcKWqVY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/parmesan-meat-loaf-b76453591a9a42a9becbb04cc212921b.jpg',
  'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1264451_8-cd8eaee.jpg?quality=90&webp=true&resize=300,272',
  'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fassets.marthastewart.com%2Fstyles%2Fwmax-300%2Fd32%2Fmake-it-your-own-chart-med109135%2Fmake-it-your-own-chart-med109135_vert.jpg%3Fitok%3DAXqFVxe-&w=550&h=731&c=sc&poi=face&q=60',
  'https://www.saveur.com/uploads/2019/03/18/5OXZJYCK7UWUML3BNNE5AU2IJM.jpg?auto=webp&auto=webp&optimize=high&quality=70&width=1920',
  'https://www.saveur.com/uploads/2019/03/18/GMLQOI4V2UP2R5W3226XGDYR7A.jpg?auto=webp&auto=webp&optimize=high&quality=70&width=1920',
  'https://www.foodrepublic.com/wp-content/uploads/2013/10/Screen-Shot-2013-10-01-at-10.07.54-AM-1280x560.png',
  'https://assets.epicurious.com/photos/54b192399a93d64c380ac470/1:1/w_1920,c_limit/395253_beef-tea_1x1.jpg',
  'https://feelgoodfoodie.net/wp-content/uploads/2017/04/Ground-Beef-Tacos-9.jpg',
  'https://hips.hearstapps.com/del.h-cdn.co/assets/cm/15/10/54f8bf5089457_-_whole-roasted-turkey-txl-evio1t-xl.jpg?resize=480:*',
  'https://www.simplyrecipes.com/thmb/jzcTkE8QWKPoUJKNazGpYkkz52g=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Easy-Beef-Brisket-LEAD-33-c250226271f24e9d94ea8b2f2bf15d92.JPG',
  'https://irepo.primecp.com/2016/03/257817/recipe-2865_Large400_ID-1441457.jpg?v=1441457',
  'https://www.seriouseats.com/thmb/ZkhRkN-nXhGn5I5tS-_o4QrOHhg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2012__05__20120513-inexpensive-steak-for-the-grill-27-df45d3c1912a4dfe891d291b280cac94.jpg',
  'https://images.food52.com/p_AHhDOExKGPYWHBEFYmJKkDINs=/1008x672/filters:format(webp)/e3ffe1b1-29a8-4804-808b-b31bfb684761--marrow_bones.jpg',
  'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F44%2F2016%2F06%2F03%2F6326441.jpg&q=60'
];

const seedDB = async () => {
  const firstTwentyRecipes = seedRecipes.slice(0, 20);
  const firstTwentyRecipesUrls = firstTwentyRecipes.map(rec => rec.url);
  const fHash = {};
  firstTwentyRecipesUrls.forEach((key, i) => fHash[key] = firstTwentyImages[i]);
  firstTwentyRecipes.forEach(recipeObject => recipeObject.imageUrl = fHash[recipeObject.url])

  const lastTwentyRecipes = seedRecipes.slice(seedRecipes.length-20, seedRecipes.length).reverse();
  const lastTwentyRecipesUrls = lastTwentyRecipes.map(rec => rec.url);
  const lHash = {};
  lastTwentyRecipesUrls.forEach((key, i) => lHash[key] = lastTwentyImages[i]);
  lastTwentyRecipes.forEach(recipeObject => recipeObject.imageUrl = lHash[recipeObject.url])

  await Ingredient.deleteMany({});
  await Ingredient.insertMany(seedIngredients);
  await Recipe.deleteMany({});
  await Recipe.insertMany(seedRecipes);
};

seedDB().then(() => {
  console.log('All ingredients reseeded');
  console.log('All recipes reseeded');
  mongoose.connection.close();
});
