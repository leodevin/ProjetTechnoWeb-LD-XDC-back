var express = require('express');
var router = express.Router();
// we import our user controller
var sensor = require('../Controllers/sensor.controller');

/* GET all sensors */
router.get('/', sensor.findAll);

module.exports = router;
