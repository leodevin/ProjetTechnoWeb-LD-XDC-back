var express = require('express');
var router = express.Router();
// we import our user controller
var sensor = require('../controllers/sensor.controller');

/* GET one sensor */
router.get('/:sensorId', sensor.findOne);
/* create  one sensor */
router.post('/', sensor.create);
/* update  one sensor */
router.put('/:sensorId', sensor.update);
/* DELETE  one sensor */
router.delete('/:sensorId', sensor.delete);

/* GET measures from one sensor */
router.get('/:sensorId/measures', sensor.findMeasuresBySensorId);

module.exports = router;
