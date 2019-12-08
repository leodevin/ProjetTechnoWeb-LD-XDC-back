var express = require('express');
var router = express.Router();
// we import our user controller
var user = require('../controllers/user.controller');

/* GET one user */
router.get('/:userId', user.findOne);
/* create  one user */
router.post('/', user.create);
/* update  one user */
router.put('/:userId', user.update);
/* DELETE  one user */
router.delete('/:userId', user.delete);

/* GET sensors from one user */
router.get('/:userId/sensors', user.findSensorsByUserId);
/* GET measures from one user */
router.get('/:userId/measures', user.findMeasuresByUserId);
/* GET all humidity measures from one user */
router.get('/:userId/humidities', user.findHumiditiesByUserId);
/* GET all temperatures measures from one user */
router.get('/:userId/temperatures', user.findTemperaturesByUserId);
/* GET all humidity measures from one user */
router.get('/:userId/airPollutions', user.findAirPollutionsByUserId);


module.exports = router;
