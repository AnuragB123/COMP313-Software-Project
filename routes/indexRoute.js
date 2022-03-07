//Load User Controller
var users = require('../controllers/UserController');
var express = require('express');
var router = express.Router();
var db = require('../config/db')
var passport = require('passport')

router.get('/index', users.findUser())

router.post('/register', users.addUser())

module.exports = router;