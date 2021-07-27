const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');

const Uri = process.env.MONGO_URL
const app = express()
const port  = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 
// env setup
// 

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: process.env.SECRET,
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));
app.use(cookieParser());

app.set('views', __dirname+'/views');
app.set('view engine', 'pug')

// 
// Databse connection
// 
mongoose.connect(Uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then( res => {
    console.log('DB connected')
}
).catch(err => console.log(err))

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', () => {
    console.log('connected successfully!')
})

// 
//  server setup
// 
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
const {auth} = require('./middleware/auth')
const { RegisterUser, LoginUser, LogoutUser, GetUserDetails} = require('./controllers/AuthController')
// routes
app.get('/', (req,res) => {
    res.render('index')
});

app.get('/login', (req,res) => {
    res.render('login')
});

app.get('/register', (req,res) => {
    res.render('register')
});

app.post('/login', LoginUser);
app.post('/register', RegisterUser);
app.get('/userDetails', auth, GetUserDetails)
app.get('/logout',auth, LogoutUser );