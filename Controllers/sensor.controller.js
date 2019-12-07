const Sensor = require('../models/Sensor.jsx');
const Measure = require('../models/Measure.jsx');

const {ObjectId} = require('mongodb');

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (!req.body.sensorId) {
        // If _id is not present in body reject the request by
        // sending the appropriate http code
        return res.status(400).send({
            message: 'id can not be empty'
        });
    }

    if (!ObjectId.isValid(req.body.sensorId)) {
        return Promise.reject(new TypeError(`Invalid id: ${req.body.sensorId}`));
    }

    // Create a new User
    const sensor = new Sensor({
        _id: ObjectId(req.body.sensorId),
        creationDate: req.body.creationDate,
        location: req.body.location,
        userID: ObjectId(req.body.userID)
    });

    // Save User in the database
    sensor
        .save()
        .then(data => {
            // we wait for insertion to be complete and we send the newly user integrated
            res.send(data);
        })
        .catch(err => {
            // In case of error during insertion of a new user in database we send an
            // appropriate message
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the Sensor.'
            });
        });
};

// Retrieve and return all Users from the database.
exports.findAll = (req, res) => {
    Sensor.find()
        .then(sensors => {
            res.send(sensors);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving Sensors.'
            });
        });
};

// Find a single User with a UserId
exports.findOne = (req, res) => {
    Sensor.findById(req.params.sensorId)
        .then(sensor => {
            if (!sensor) {
                return res.status(404).send({
                    message: 'Sensor not found with id ' + req.params.sensorId
                });
            }
            res.send(sensor);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'Sensor not found with id ' + req.params.sensorId
                });
            }
            return res.status(500).send({
                message: 'Error retrieving Sensor with id ' + req.params.sensorId
            });
        });
};

// Find a single User with a UserId
exports.findMeasuresBySensorId = (req, res) => {
    Measure.find({sensorID: req.params.sensorId})
        .then(measures => {
            if (!measures) {
                return res.status(404).send({
                    message: 'Measures not found with Sensor id ' + req.params.sensorId
                });
            }
            res.send(measures);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'Sensor not found with id ' + req.params.sensorId
                });
            }
            return res.status(500).send({
                message: 'Error retrieving Sensor with id ' + req.params.sensorId
            });
        });
};





// Update a User identified by the UserId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.sensorId) {
        return res.status(400).send({
            message: 'id can not be empty'
        });
    }

    if (!ObjectId.isValid(req.body.sensorId)) {
        return Promise.reject(new TypeError(`Invalid id: ${req.body.sensorId}`));
    }

    // Find user and update it with the request body
    Sensor.findByIdAndUpdate(
        req.params.sensorId,
        {
            _id: ObjectId(req.body.sensorId),
            creationDate: req.body.creationDate,
            location: req.body.location,
            userID: ObjectId(req.body.userID)
        }
    )
        .then(sensor => {
            if (!sensor) {
                return res.status(404).send({
                    message: 'Sensor not found with id ' + req.params.sensorId
                });
            }
            res.send(sensor);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'Sensor not found with id ' + req.params.sensorId
                });
            }
            return res.status(500).send({
                message: 'Error updating Sensor with id ' + req.params.sensorId
            });
        });
};


// Delete a User with the specified UserId in the request
exports.delete = (req, res) => {
    Sensor.findByIdAndRemove(req.params.sensorId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: 'Sensor not found with id ' + req.params.sensorId
                });
            }
            res.send({ message: 'Sensor deleted successfully!' });
        })
        .catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: 'Sensor not found with id ' + req.params.sensorId
                });
            }
            return res.status(500).send({
                message: 'Could not delete sensor with id ' + req.params.sensorId
            });
        });
};


