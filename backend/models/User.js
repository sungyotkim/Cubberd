const mongoose = require('mongoose');
const Ingredient = require('./Ingredient');
const Schema = mongoose.Schema;

const userSchema = Schema({
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    hashedPassword: {
      type: String,
      required: true
    },
    cubberd: ['Ingredient']
    // cubberd: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Ingredient'
    //   }
    // ]
    // ['Ingredient']
  }, {
    timestamps: true
  });

  module.exports = mongoose.model('User', userSchema)