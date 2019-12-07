
// grab the things we need
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

// create a schema
const sensorSchema = new Schema({
    _id: ObjectId,
    creationDate: Date,
    location: String,
    userID: ObjectId
});

// the schema is useless so far
// we need to create a model using it
const Sensor = mongoose.model('Sensor', sensorSchema,'Sensor');

// make this available to our users in our Node applications
module.exports = Sensor;


// Ressources : https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications