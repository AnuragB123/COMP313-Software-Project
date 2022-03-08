//Load User Controller
var users = require('../controllers/UserController');
var express = require('express');
var router = express.Router();
var db = require('../config/db')
var passport = require('passport')

router.post('/index', users.findUser)

module.exports = router;