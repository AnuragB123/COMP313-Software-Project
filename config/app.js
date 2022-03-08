// installed 3rd party packages
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let cors = require('cors');
var passport = require('passport');
var indexRouter = require('../routes/indexRoute')
var flash = require('flash')
//var userRouter = require('../routes/userRoute');


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


let app = express();

//views setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.use('/', indexRouter)

//Error handling
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(cors());

app.listen(3001, () => {
  console.log('listening on port 3001');
})
module.exports = app;
