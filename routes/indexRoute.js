//Load User Controller
var userController = require('../controllers/UserController');
var express = require('express');
var router = express.Router();


/* set up GET route for default/Home page. */
router.get('/', userController.getIndex);

//Process Login
router.post('/login', userController.findUser);

router.get('/logout', userController.logout)

/*
router.get('/calendar', function(req, res) => {
    res.render('calendar');
})
*/

module.exports = router;