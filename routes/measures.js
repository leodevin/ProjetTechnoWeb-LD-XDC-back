var express = require('express');
var router = express.Router();
// we import our user controller
var measure = require('../Controllers/measure.controller');

/* GET all measures */
router.get('/', measure.findAll);

module.exports = router;
