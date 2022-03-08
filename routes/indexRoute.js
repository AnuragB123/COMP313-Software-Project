//Load User Controller
var users = require('../controllers/UserController');
var express = require('express');
var router = express.Router();

router.get('/', users.findUser)

module.exports = router;