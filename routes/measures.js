var express = require('express');
var router = express.Router();
// we import our user controller
var measure = require('../controllers/measure.controller');

/* GET one user */
router.get('/', measure.findAll);

module.exports = router;
