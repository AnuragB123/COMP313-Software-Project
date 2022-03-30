//Load User Controller
var graderController = require('../controllers/GradeController');
//Third party libraries
var express = require('express');
var router = express.Router();
router.get('/get', graderController.getTeacherGrader);