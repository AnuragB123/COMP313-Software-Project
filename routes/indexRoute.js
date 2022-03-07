//Load User Controller
var users = require('../controllers/UserController');
var express = require('express');
var router = express.Router();
var db = require('../config/db')
var passport = require('passport')

module.exports = function (app) {
    //Routing to index (login page)
    app.get('/index', users.findUser())
    //Routing to register page
    app.post('/register', users.addUser())
}

module.exports = app;