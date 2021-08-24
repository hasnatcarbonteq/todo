const express = require("express");
const InitiateMongoServer = require("./db/db");
const bodyParser = require("body-parser");
const session = require('express-session');
const methodOverride = require('method-override');
const user = require("./http/routes/user"); 
const list = require("./http/routes/list")

const app = express();
const oneDay = 1000 * 60 * 60 * 24;

app.set('views', __dirname+'/views');
app.set('view engine', 'pug')


// Initiate Mongo Server
InitiateMongoServer();

// PORT
const PORT = process.env.PORT || 4000;


// Passport middleware
// app.use(passport.initialize())
// app.use(passport.session())

// Middlware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({
secret: process.env.SECRET,
resave: false,
saveUninitialized: false,
cookie: {
    maxAge: oneDay,
}
}));

app.get("/", (req, res) => {
  if (!req.session.token) {
    res.redirect('/user/login')
  }
  else {
    res.redirect('/list/getList')
  }
});

/**
 * Router Middleware
 * Router - /user/*
 * Method - *
 */
app.use("/user", user);
/**
 * Router Middleware
 * Router - /list/*
 * Method - *
 */
app.use("/list", list)


app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});