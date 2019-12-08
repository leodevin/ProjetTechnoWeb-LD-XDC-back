const User = require('../models/User.jsx');
const Sensor = require('../models/Sensor.jsx');
const Measure = require('../models/Measure.jsx');

const {ObjectId} = require('mongodb');

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (!req.body.userId) {
        // If _id is not present in body reject the request by
        // sending the appropriate http code
        return res.status(400).send({
            message: '_id can not be empty'
        });
    }

    if (!ObjectId.isValid(req.body.userId)) {
        return Promise.reject(new TypeError(`Invalid id: ${req.body.userId}`));
    }

    // Create a new User
    const user = new User({
        _id: ObjectId(req.body.userId),
        location: req.body.location,
        personsInHouse: req.body.personsInHouse,
        houseSize: req.body.houseSize
    });

    // Save User in the database
    user
        .save()
        .then(data => {
            // we wait for insertion to be complete and we send the newly user integrated
            res.send(data);
        })
        .catch(err => {
            // In case of error during insertion of a new user in database we send an
            // appropriate message
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the User.'
            });
        });
};

// Retrieve and return all Users from the database.
exports.findAll = (req, res) => {
    User.find()
        .then(users => {
            res.send(users);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving users.'
            });
        });
};

// Find a single User with a UserId
exports.findOne = (req, res) => {
    User.findById(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: 'User not found with id ' + req.params.userId
                });
            }
            res.send(user);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'User not found with id ' + req.params.userId
                });
            }
            return res.status(500).send({
                message: 'Error retrieving user with id ' + req.params.userId
            });
        });
};

// Find a single User with a UserId
exports.findSensorsByUserId= (req, res) => {
    Sensor.find({userID: req.params.userId})
        .then(sensors => {
            if (!sensors) {
                return res.status(404).send({
                    message: 'Sensors not found with User id ' + req.params.userId
                });
            }
            res.send(sensors);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'User not found with id ' + req.params.userId
                });
            }
            return res.status(500).send({
                message: 'Error retrieving user with id ' + req.params.userId
            });
        });
};

//Find all the measures with a UserId
exports.findMeasuresByUserId= (req, res) => {
    Sensor.find({userID: req.params.userId})
        .then(sensors => {
            if (!sensors) {
                return res.status(404).send({
                    message: 'Sensors not found with User id ' + req.params.userId
                });
            }
            sensors.forEach(sensor => {
                Measure.find({sensorID: sensor._id})
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
            });
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'User not found with id ' + req.params.userId
                });
            }
            return res.status(500).send({
                message: 'Error retrieving user with id ' + req.params.userId
            });
        });
};

//Find all the humidities measures with a UserId
exports.findHumiditiesByUserId= (req, res) => {
    Sensor.find({userID: req.params.userId})
        .then(sensors => {
            if (!sensors) {
                return res.status(404).send({
                    message: 'Sensors not found with User id ' + req.params.userId
                });
            }
            sensors.forEach(sensor => {
                Measure.find({sensorID: sensor._id, type: "humidity"})
                    .then(measures => {
                        if (!measures) {
                            return res.status(404).send({
                                message: 'Measures of humidity not found with Sensor id ' + req.params.sensorId
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
            });
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'User not found with id ' + req.params.userId
                });
            }
            return res.status(500).send({
                message: 'Error retrieving user with id ' + req.params.userId
            });
        });
};

//Find all the temperatures measures with a UserId
exports.findTemperaturesByUserId= (req, res) => {
    Sensor.find({userID: req.params.userId})
        .then(sensors => {
            if (!sensors) {
                return res.status(404).send({
                    message: 'Sensors not found with User id ' + req.params.userId
                });
            }
            sensors.forEach(sensor => {
                Measure.find({sensorID: sensor._id, type: "temperature"})
                    .then(measures => {
                        if (!measures) {
                            return res.status(404).send({
                                message: 'Measures of humidity not found with Sensor id ' + req.params.sensorId
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
            });
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'User not found with id ' + req.params.userId
                });
            }
            return res.status(500).send({
                message: 'Error retrieving user with id ' + req.params.userId
            });
        });
};

//Find all the airPollutions measures with a UserId
exports.findAirPollutionsByUserId= (req, res) => {
    Sensor.find({userID: req.params.userId})
        .then(sensors => {
            if (!sensors) {
                return res.status(404).send({
                    message: 'Sensors not found with User id ' + req.params.userId
                });
            }
            sensors.forEach(sensor => {
                Measure.find({sensorID: sensor._id, type: "airPollution"})
                    .then(measures => {
                        if (!measures) {
                            return res.status(404).send({
                                message: 'Measures of humidity not found with Sensor id ' + req.params.sensorId
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
            });
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'User not found with id ' + req.params.userId
                });
            }
            return res.status(500).send({
                message: 'Error retrieving user with id ' + req.params.userId
            });
        });
};

// Update a User identified by the UserId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.userId) {
        return res.status(400).send({
            message: 'id can not be empty'
        });
    }

    if (!ObjectId.isValid(req.body.userId)) {
        return Promise.reject(new TypeError(`Invalid id: ${req.body.userId}`));
    }

    // Find user and update it with the request body
    User.findByIdAndUpdate(
        req.params.userId,
        {
            _id: ObjectId(req.body.userId),
            location: req.body.location,
            personsInHouse: req.body.personsInHouse,
            houseSize: req.body.houseSize
        }
    )
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: 'User not found with id ' + req.params.userId
                });
            }
            res.send(user);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'User not found with id ' + req.params.userId
                });
            }
            return res.status(500).send({
                message: 'Error updating user with id ' + req.params.userId
            });
        });
};

// Delete a User with the specified UserId in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: 'User not found with id ' + req.params.userId
                });
            }
            res.send({ message: 'User deleted successfully!' });
        })
        .catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: 'User not found with id ' + req.params.userId
                });
            }
            return res.status(500).send({
                message: 'Could not delete user with id ' + req.params.userId
            });
        });
};


