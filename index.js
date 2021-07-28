const express = require("express");
const bodyParser = require("body-parser");
const InitiateMongoServer = require("./config/db");
const user = require("./routes/user"); 

const app = express();
app.set('views', __dirname+'/views');
app.set('view engine', 'pug')


// Initiate Mongo Server
InitiateMongoServer();

// PORT
const PORT = process.env.PORT || 4000;

// Middlware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get("/", (req, res) => {
  res.render('index')
});

app.get("/login", (req, res) => {
  res.render('login')
});

app.get("/register", (req, res) => {
  res.render('register')
});

/**
 * Router Middleware
 * Router - /user/*
 * Method - *
 */
app.use("/user", user);

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});