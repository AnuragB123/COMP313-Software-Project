 /*
Developers who contributed to this file:
Vaishali 
*/

// installed 3rd party packages
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let cors = require('cors');  
var passport = require('passport');
var session = require('express-session')
//Routers for Pages
var indexRouter = require('../routes/indexRoute')
var userRouter = require('../routes/userRoute')
var checkListRouter = require('../routes/checklistRoute')
var calenderRouter = require('../routes/calenderRoute')

//Express App
let app = express();

// database setup
let mongoose = require('mongoose');
let DB = require('./db');  

// point mongoose to the DB URI
mongoose.connect(DB.URI, {useNewUrlParser: true, useUnifiedTopology: true});

//Connection to MongoDB server
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
//express setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Setup Cookie Settings
app.use(cookieParser('prime'));

//Directories to Public and Node Modules for external packages
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static('public'));
app.use(express.static(path.join(__dirname, 'node_modules')));

//Using our Routes
app.use('/', indexRouter)
app.use('/user', userRouter)
app.use('/checklist', checkListRouter)
app.use('/calender', calenderRouter)

//Error handling
app.use(function(req, res, next) {
  next(createError(404));
});

//Using Cors
app.use(cors());

//Exporting the function file
module.exports = app;