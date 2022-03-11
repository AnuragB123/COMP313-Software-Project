//Load User Controller
var userController = require('../controllers/UserController');
var express = require('express');
var router = express.Router();


router.get('/login', userController.getLogin);
router.post('/login', userController.postRegistration);

module.exports = router;