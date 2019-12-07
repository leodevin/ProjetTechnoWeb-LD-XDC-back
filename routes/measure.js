var express = require('express');
var router = express.Router();
// we import our user controller
var measure = require('../controllers/measure.controller');

/* GET one user */
router.get('/:measureId', measure.findOne);
/* create  one user */
router.post('/', measure.create);
/* update  one user */
router.put('/:measureId', measure.update);
/* DELETE  one user */
router.delete('/:measureId', measure.delete);

module.exports = router;
