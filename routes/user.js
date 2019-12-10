var express = require('express');
var router = express.Router();
// we import our user controller
var user = require('../Controllers/user.controller');

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


module.exports = router;
