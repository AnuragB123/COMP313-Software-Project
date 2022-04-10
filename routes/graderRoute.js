/*
Developers who contributed to this file:
Arpit
*/


var gradeController = require('../controllers/GradeController');
//Third party libraries
var express = require('express');
var router = express.Router();
//Routes to all pages involving User
router.get('/grades', gradeController.getGrades);
router.post('/addGrade', gradeController.addGrade);
router.get('/deleteGrade/:id', gradeController.deleteGrade);
router.post('/updateGrade', gradeController.updateGrade);
//Export Functions
module.exports = router;