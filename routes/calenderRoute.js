/* Developers who contributed to this file: Joseph Volpe */

//Load User Controller
var calenderController = require('../controllers/CalenderController');
//Third party libraries
var express = require('express');
var router = express.Router();
//Routers for different pages regarding calender
router.get('/', calenderController.getMenu);
router.get('/get', calenderController.getCalender);
router.get('/crud', calenderController.getCrud);
router.post('/crud', calenderController.postCrud);
router.get('/finder', calenderController.getFinder);
router.post('/finder', calenderController.postFinder);
router.get('/delete/:id', calenderController.postdeleteCalender); 
router.post('/insert', calenderController.postinsertCalender);

//Export Functions
module.exports = router;
