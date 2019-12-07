var express = require('express');
var router = express.Router();
// we import our user controller
var sensor = require('../controllers/sensor.controller');

/* GET one user */
router.get('/:sensorId', sensor.findOne);
/* create  one user */
router.post('/', sensor.create);
/* update  one user */
router.put('/:sensorId', sensor.update);
/* DELETE  one user */
router.delete('/:sensorId', sensor.delete);

module.exports = router;
