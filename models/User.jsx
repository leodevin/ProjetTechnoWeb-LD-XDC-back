
// grab the things we need
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

// create a schema
const userSchema = new Schema({
    _id: ObjectId,
    location: String,
    personsInHouse: Number,
    houseSize: String
});

// the schema is useless so far
// we need to create a model using it

// make this available to our users in our Node applications
module.exports = mongoose.model('User', userSchema, 'User');


// Ressources : https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications