
// grab the things we need
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

// create a schema
const measureSchema = new Schema({
    _id: ObjectId,
    type: String,
    creationDate: Date,
    sensorID: ObjectId,
    value: Number
});

// the schema is useless so far
// we need to create a model using it
const Measure = mongoose.model('Measure', measureSchema,'Measure');

// make this available to our users in our Node applications
module.exports = Measure;


// Ressources : https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications