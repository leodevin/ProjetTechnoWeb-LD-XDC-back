var express = require('express');
var router = express.Router();
// we import our user controller
var measure = require('../Controllers/measure.controller');

/* GET one measure */
router.get('/:measureId', measure.findOne);
/* create  one measure */
router.post('/', measure.create);
/* update  one measure */
router.put('/:measureId', measure.update);
/* DELETE  one measure */
router.delete('/:measureId', measure.delete);

module.exports = router;
