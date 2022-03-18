// installed 3rd party packages
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let cors = require('cors');
var passport = require('passport');
var session = require('express-session')
var indexRouter = require('../routes/indexRoute')
var userRouter = require('../routes/userRoute')
var checkListRouter = require('../routes/checklistRoute')

let app = express();

// database setup
let mongoose = require('mongoose');
let DB = require('./db');

// point mongoose to the DB URI
mongoose.connect(DB.URI, {useNewUrlParser: true, useUnifiedTopology: true});

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', ()=>{
  console.log('Connected to MongoDB...');
});


// create a User Model Instance
let userModel = require('../models/user');
let User = userModel.User;
//body parser
app.use(express.urlencoded({extended: false}))

//express session
//setup express session
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: true,
  resave: true
}));


//views setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('prime'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static('public'));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.use('/', indexRouter)
app.use('/user', userRouter)
app.use('/checklist', checkListRouter)

//Error handling
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(cors());
module.exports = app;