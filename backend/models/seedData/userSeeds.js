require('dotenv').config();

const mongoose = require('mongoose');
const User = require('../User');
const {mongoURI: db} = require('../../config/keys.js');

mongoose
.connect(db, { useNewUrlParser: true, useUnifiedTopology: true})
.then (() => {
    console.log("Connected to mongoDB successfully")
    })
    .catch (err => {
        console.log(err)
    }) 

const seedUsers = [
        {
            username: 'user1',
            email: 'user1@user.com',
            password: 'password'
        }
]

const seedDB = async () => {
    await User.deleteMany({});
    await User.insertMany(seedUsers);
};

seedDB().then(() => {
    mongoose.connection.close();
});
