//Load User Controller
var userController = require('../controllers/UserController');
var express = require('express');
var router = express.Router();

/* set up GET route for default/Home page. */
router.get('/', userController.getIndex);

/* set up GET route for default/Home page. */
router.get('/index', userController.getIndex);

module.exports = router;