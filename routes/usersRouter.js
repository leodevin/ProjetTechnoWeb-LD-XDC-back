var express = require("express");
var router = express.Router();
var usersModel = require('../models/User.jsx');

/* GET users listing. */
getUsers =  (req, res) => {

};

router.get('/users', function (req, res) {
  usersModel.find( {personsInHouse: 6}, function(error, comments) {
    console.log(comments); //Display the comments returned by MongoDB, if any were found. Executes after the query is complete.
  });
  res.send('JTB');
});

module.exports = router;
