const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Ingredient = mongoose.model('Ingredient')
const { loginUser, restoreUser, requireUser } = require('../../config/passport');
const passport = require('passport');
const validateRegisterInput = require('../../validations/register');
const validateLoginInput = require('../../validations/login');
const { isProduction } = require('../../config/keys');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    message: "GET /api/users"
  });
});

//POST /api/users/register
router.post('/register', validateRegisterInput, async (req, res, next) => {
  const user = await User.findOne({
    $or: [{email: req.body.email}, {username: req.body.username}]
  });

  if (user) {
    const err = new Error("Validation Error");
    err.statusCode = 400;
    const errors = {};
    if (user.email === req.body.email) {
      errors.email = "A user has already registered with this email";
    }
    if (user.username === req.body.username) {
      errors.username = "A user has alrady registered with this username"
    }
    err.errors = errors;
    return next(err);
  }

  const newUser = new User ({
    username: req.body.username,
    email: req.body.email
  });
  newUser.cubberd.push({ObjectId: '6356c1fd72c6fbbe8299905f'})

  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
      if (err) throw err;
      try {
        newUser.hashedPassword = hashedPassword;
        const user = await newUser.save();
        return res.json(await loginUser(user));
      }
      catch(err) {
        next(err);
      }
    })
  });
});

// POST /api/users/login
router.post('/login', validateLoginInput, async (req, res, next) => {
  passport.authenticate('local', async function(err, user) {
    if (err) return next(err);
    if (!user) {
      const err = new Error('Invalid credentials');
      err.statusCode = 400;
      err.errors = { email: "Invalid credentials" };
      return next(err);
    }
    return res.json(await loginUser(user));
  })(req, res, next);
});

router.get('/current', restoreUser, (req, res) => {
  if (!isProduction) {
    // In development, allow React server to gain access to the CSRF token
    // whenever the current user information is first loaded into the
    // React application
    const csrfToken = req.csrfToken();
    res.cookie("CSRF-TOKEN", csrfToken);
  }
  if (!req.user) return res.json(null);
  res.json({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email
  });
});

// Get Cubberd
router.get('/:userId/cubberd', requireUser, async (req, res) => {
  const cubberd = await User.findById( req.params.userId, 'cubberd');
  // extracts the cubberd nested document from the user of userId
  res.json(cubberd);
});

router.post('/:userId/cubbered', restoreUser, requireUser, async (req, res) => {
  const ingredientId = req.body;
  const currentUserId = req.user._id;
  User.updateOne({ _id: currentUserId}, { $push: { cubberd: ingredientId }});
  const cubberd = await User.findById( req.params.userId, 'cubberd');
  res.json(cubberd);
})

router.delete('/:userId/cubbered', restoreUser, requireUser, async (req, res) => {
  const ingredientId = req.body;
  const currentUserId = req.user._id;
  User.updateOne({ _id: currentUserId}, { $pull: { cubberd: ingredientId }});
  const cubberd = await User.findById( req.params.userId, 'cubberd');
  res.json(cubberd);
})

module.exports = router;
