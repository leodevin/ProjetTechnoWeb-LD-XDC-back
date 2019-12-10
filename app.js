const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require('mongoose');
const config = require('./config/database.config');
const cors = require('cors');


mongoose.connect(config.url, {useNewUrlParser: true});
const app = express();

const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const usersRouter = require("./routes/users");
const sensorRouter = require("./routes/sensor");
const sensorsRouter = require("./routes/sensors");
const measureRouter = require("./routes/measure");
const measuresRouter = require("./routes/measures");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

const db = mongoose.connection;
db.once('open', () => console.log('connected to the fucking  database'));
// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/users", usersRouter);
app.use("/sensor", sensorRouter);
app.use("/sensors", sensorsRouter);
app.use("/measure", measureRouter);
app.use("/measures", measuresRouter);


module.exports = app;
