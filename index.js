const express = require("express");
const bodyParser = require("body-parser");
const InitiateMongoServer = require("./config/db");
const session = require('express-session');

const user = require("./routes/user"); 
const list = require("./routes/list")

const app = express();
app.set('views', __dirname+'/views');
app.set('view engine', 'pug')

const oneDay = 1000 * 60 * 60 * 24;

// Initiate Mongo Server
InitiateMongoServer();

// PORT
const PORT = process.env.PORT || 4000;

// Middlware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SECRET,
  saveUninitialized: true,
  resave: true,
  cookie: {
    maxAge: oneDay,
  }
}));


app.get("/", (req, res) => {
  if (!req.session.token) {
    res.redirect('/login')
  }
  else {
    res.redirect('/list/getList')
    // res.render('index', {data: req.session.token});
  }
});

app.get("/login", (req, res) => {
  res.render('login')
});

app.get("/register", (req, res) => {
  res.render('register')
});

app.get("/logout", (req,res) => {
    req.session.destroy();
    res.redirect('/login');
})
/**
 * Router Middleware
 * Router - /user/*
 * Method - *
 */
app.use("/user", user);
app.use("/list", list)


app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});