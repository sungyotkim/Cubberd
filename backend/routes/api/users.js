const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Ingredient = mongoose.model("Ingredient");
const {loginUser, restoreUser, requireUser} = require("../../config/passport");
const passport = require("passport");
const validateRegisterInput = require("../../validations/register");
const validateLoginInput = require("../../validations/login");
const { isProduction } = require("../../config/keys");
const Recipe = require("../../models/Recipe");
const ShoppingListItem = mongoose.model('ShoppingListItem')

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.json({
    message: "GET /api/users",
  });
});

//POST /api/users/register
router.post("/register", validateRegisterInput, async (req, res, next) => {
  const user = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }],
  });

  if (user) {
    const err = new Error("Validation Error");
    err.statusCode = 400;
    const errors = {};
    if (user.email === req.body.email) {
      errors.email = "A user has already registered with this email";
    }
    if (user.username === req.body.username) {
      errors.username = "A user has alrady registered with this username";
    }
    err.errors = errors;
    return next(err);
  }

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
  });

  const jasmineRice = await Ingredient.findOne({ food: "Jasmine Rice" }).exec();
  const chickenBreast = await Ingredient.findOne({food: "Boneless Skinless Chicken Breast"}).exec();

  const recipe1 = await Recipe.findOne({ label: "Super Bowl Snacks: Loaded Baked Potato Potato Chip Nachos Recipe" }).exec();
  const recipe2 = await Recipe.findOne({ label: "Pasta alla Gricia Recipe" }).exec();
  const recipe3 = await Recipe.findOne({ label: "Crispy Roasted Mushrooms" }).exec();
  const recipe4 = await Recipe.findOne({ label: "Tofu Banana Mousse" }).exec();

  const banana = await Ingredient.findOne({food: "Banana" }).exec();
  const shoppingListItem = new ShoppingListItem({ quantity: 4, ingredient: banana })
  await shoppingListItem.save();

  newUser.cubberd.push(jasmineRice);
  newUser.cubberd.push(chickenBreast);
  newUser.savedRecipes.favorited.push(recipe1);
  newUser.savedRecipes.favorited.push(recipe2);
  newUser.savedRecipes.planned.push(recipe3);
  newUser.savedRecipes.planned.push(recipe4);
  newUser.shoppingList.push(banana);
  
  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
      if (err) throw err;
      try {
        newUser.hashedPassword = hashedPassword;
        const user = await newUser.save();
        return res.json(await loginUser(user));
      } catch (err) {
        next(err);
      }
    });
  });
});

// POST /api/users/login
router.post("/login", validateLoginInput, async (req, res, next) => {
  passport.authenticate("local", async function (err, user) {
    if (err) return next(err);
    if (!user) {
      const err = new Error("Invalid credentials");
      err.statusCode = 400;
      err.errors = { email: "Invalid credentials" };
      return next(err);
    }
    return res.json(await loginUser(user));
  })(req, res, next);
});

router.get("/current", restoreUser, (req, res) => {
  if (!isProduction) {
    // In development, allow React server to gain access to the CSRF token
    // whenever the current user information is first loaded into the
    // React application
    const csrfToken = req.csrfToken();
    res.cookie("CSRF-TOKEN", csrfToken);
  }
  if (!req.user) return res.json(null);
  const allUserInfo = {
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
    cubberd: req.user.cubberd, 
    savedRecipes: req.user.savedRecipes,
    shoppingList: req.user.shoppingList
  };
  res.json(allUserInfo);
});

// Get Cubberd
router.get("/:userId/cubberd", requireUser, async (req, res) => {
  const cubberd = await User.findById(req.params.userId, "cubberd");
  // extracts the cubberd nested document from the user of userId
  res.json(cubberd);
});

// router.post('/:userId/cubbered', restoreUser, requireUser, async (req, res) => {
router.post("/:userId/cubberd", restoreUser, requireUser, async (req, res) => {
  const ingredient = req.body;
  const currentUserId = req.params.userId;
  const currentUser = await User.findById(currentUserId);
  currentUser.cubberd.push(ingredient);
  currentUser.save();
  res.json(currentUser.cubberd);
});

router.delete("/:userId/cubberd", restoreUser, requireUser, async (req, res) => {
    const ingredient = req.body;
    const currentUserId = req.user._id;
    const currentUser = await User.findById(currentUserId);
    currentUser.cubberd.pull(ingredient);
    currentUser.save();
    res.json(currentUser.cubberd);
  }
);

//eventually require user
router.get("/:userId/shoppingList", async (req, res) => {
  const shoppingList = await User.findById(req.params.userId, "shoppingList");
  res.json(shoppingList);
});

//eventually require user
router.post("/:userId/shoppingList", async(req, res) => {
  //const currentUserId = req.user._id;
  console.log(req.params.userId)
  const currentUser = await User.findById(req.params.userId)
  console.log("currentuser shopping list")
  console.log(currentUser.shoppingList)
  const ingredient = await Ingredient.findOne(req.body);
  const newShoppingListItem = new ShoppingListItem({
    quantity: 1,
    ingredient: ingredient
  })
  const shoppingListItem = await newShoppingListItem.save()
  console.log("shopping list itme")
  console.log(shoppingListItem)
  currentUser.shoppingList.push(shoppingListItem);
  currentUser.save();
  return res.json(currentUser.shoppingList)
})

module.exports = router;