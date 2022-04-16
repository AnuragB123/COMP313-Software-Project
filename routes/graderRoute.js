//Load User Controller
var graderController = require('../controllers/GradeController');
//Third party libraries
var express = require('express');
var router = express.Router();
//Routes to all pages involving User
router.get('/getGrades', graderController.getGraderPage);
router.post('/addGrade', graderController.addGrade);
module.exports = router;