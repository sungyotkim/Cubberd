require('dotenv').config({path: '../../.env'});

const mongoose = require('mongoose');
const {mongoURI: db} = require('../../config/keys.js');

const User = require('../User');

mongoose
.connect(db, { useNewUrlParser: true, useUnifiedTopology: true})
.then (() => {
    console.log("Connected to mongoDB successfully")
    })
    .catch (err => {
        console.log(err)
    }) 

const seedDB = async () => {
    await User.deleteMany({});
};

seedDB().then(() => {
    console.log('All users deleted');
    mongoose.connection.close();
});