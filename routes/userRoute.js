/*
Developers who contributed to this file:
Vaishali 
Arpit
Anurag
*/

//Load User Controller
var userController = require('../controllers/UserController');
//Third party libraries
var express = require('express');
var router = express.Router();
//Routes to all pages involving User
router.get('/', userController.getLogin);
router.post('/profile', userController.postLogin);
router.get('/register', userController.getRegister);
router.post('/register', userController.postRegistration);
router.post('/updateProfile', userController.updateUsers);
router.get('/profile', userController.getProfile);
router.get('/logout', userController.getLogout);
//Export Functions
module.exports = router;