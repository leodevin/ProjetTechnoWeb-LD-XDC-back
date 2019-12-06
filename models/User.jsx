
// grab the things we need
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const userSchema = new Schema({
    _id: ObjectId,
    location: String,
    personsInHouse: Number,
    houseSize: String

});

// the schema is useless so far
// we need to create a model using it
const User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;


// Ressources : https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications