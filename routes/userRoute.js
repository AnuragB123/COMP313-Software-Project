//Load User Controller
var userController = require('../controllers/UserController');
var express = require('express');
var router = express.Router();


router.get('/', userController.getLogin);
router.post('/profile', userController.postLogin);
router.get('/register', userController.getRegister);
router.post('/register', userController.postRegistration);

module.exports = router;