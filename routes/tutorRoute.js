/*
Developers who contributed to this file:
Vaishali 
*/

//Load User Controller
var tutorController = require('../controllers/TutorController');
//Third party libraries
var express = require('express');
var router = express.Router();
//Routers for different pages regarding Checklist
router.get('/getTutor', tutorController.getTutor);
router.post('/insert', tutorController.insertMeeting);

//Export Functions
module.exports = router;