var express = require("express");
var path = require("path");
let cors = require('cors');
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/usersRouter");

var app = express();
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/DashboardProject', {useNewUrlParser: true});

var db = mongoose.connection;
db.once('open', () => console.log('connected to the fucking  database'));
// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



 app.use("/", indexRouter);
 app.use("/users", usersRouter);


module.exports = app;
