//Load User Controller
var users = require('../controllers/UserController');
var express = require('express');
var router = express.Router();

router.get('/index', users.findUser, (req, res) => {
    res.render('index');
});

router.get('/signup', users.addUser, (req,res,next) => {
    res.render('register');
})

module.exports = router;