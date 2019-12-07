const Measure = require('../models/Measure.jsx');

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (!req.body.measureId) {
        // If _id is not present in body reject the request by
        // sending the appropriate http code
        return res.status(400).send({
            message: 'id can not be empty'
        });
    }

    // Create a new User
    const measure = new Measure({
        _id: req.body._id,
        type: req.body.type,
        creationDate: req.body.creationDate,
        sensorID: req.body.sensorID,
        value: req.body.value
    });

    // Save User in the database
    measure
        .save()
        .then(data => {
            // we wait for insertion to be complete and we send the newly user integrated
            res.send(data);
        })
        .catch(err => {
            // In case of error during insertion of a new user in database we send an
            // appropriate message
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the measure.'
            });
        });
};

// Retrieve and return all Users from the database.
exports.findAll = (req, res) => {
    Measure.find()
        .then(measure => {
            res.send(measure);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving measures.'
            });
        });
};

// Find a single User with a UserId
exports.findOne = (req, res) => {
    Measure.findById(req.params.measureId)
        .then(measure => {
            if (!measure) {
                return res.status(404).send({
                    message: 'Measure not found with id ' + req.params.measureId
                });
            }
            res.send(measure);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'Measure not found with id ' + req.params.measureId
                });
            }
            return res.status(500).send({
                message: 'Error retrieving Measure with id ' + req.params.measureId
            });
        });
};


// Update a User identified by the UserId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.measureId) {
        return res.status(400).send({
            message: 'id can not be empty'
        });
    }

    // Find user and update it with the request body
    Measure.findByIdAndUpdate(
        req.params.measureId,
        {
            _id: req.body._id,
            type: req.body.type,
            creationDate: req.body.creationDate,
            sensorID: req.body.sensorID,
            value: req.body.value
        }
    )
        .then(measure => {
            if (!measure) {
                return res.status(404).send({
                    message: 'Measure not found with id ' + req.params.measureId
                });
            }
            res.send(measure);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'Measure not found with id ' + req.params.measureId
                });
            }
            return res.status(500).send({
                message: 'Error updating Measure with id ' + req.params.measureId
            });
        });
};

// Delete a User with the specified UserId in the request
exports.delete = (req, res) => {
    Measure.findByIdAndRemove(req.params.measureId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: 'Measure not found with id ' + req.params.measureId
                });
            }
            res.send({ message: 'Measure deleted successfully!' });
        })
        .catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: 'Measure not found with id ' + req.params.measureId
                });
            }
            return res.status(500).send({
                message: 'Could not Measure sensor with id ' + req.params.measureId
            });
        });
};

