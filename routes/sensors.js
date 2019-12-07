var express = require('express');
var router = express.Router();
// we import our user controller
var sensor = require('../controllers/sensor.controller');

/* GET one user */
router.get('/', sensor.findAll);

module.exports = router;
