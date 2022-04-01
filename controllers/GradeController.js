/*
Developers who contributed to this file:
Vaishali 
*/
//Third party libraries
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// create a reference to the model
let Grade  = require('../models/grade');

let User = require('../models/user');

//-----------------------------------------------------Grade operations--------------------------------------------------------
// show teacher grader form, need to figure out how to pass the list of student users (need to work with Vaishali/Arpit)
getTeacherGraderPage = (req, res)=> {
  //Filter users who are user type student and then put them into a list and then pass this list as a paarameter... into the res.render
  res.render('teacherGrader', {messages: 'Add Grades'}); 
}
// show student grader form
getStudentGraderPage = (req, res)=> {
  //Grader object of userid (user logged in)
  res.render('studentGrader', {messages: 'View Grades' }); 
}
// function to get Grades
getGrades= (req, res, next) => {
    let uid = req.params.userid;

    Grade.find({userid : uid},(err, gradesList) => {
      if(err)
      {
          return console.error(err);
      }
      else
      {
          res.status(200).json(gradesList);
      }
  });
  }
  
// function to delete Grades
deleteGrade = (req, res, next) => {
    let id = req.params.id;

    Grade.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
          res.status(200).json({success: true, msg: 'Successfully Deleted Grade'});
        }
    });
}  

// function to update a Grade
updateGrade = (req, res, next) => {
    let id = req.params.id
  
    Grade.updateOne(
      {_id: id},  // <-- find stage
      { $set: {    // <-- set stage
        userid: req.body.userid,
        courseName: req.body.courseName,
        grade: req.body.grade,
        marks: req.body.marks
        }}).then(result => {
      res.status(200).json({ message: "Grade Update successful!"});
    });
  }

  // function to insert Grade into DB
addGrade= (req, res, next) => {
    
    let newgrade = Grade({
      userid: req.body.userid,
      courseName: req.body.courseName,
      grade: req.body.grade,
      marks: req.body.marks
    });
  
    Grade.create(newgrade, (err, grade) =>{
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
        res.status(200).json({success: true, msg: 'Successfully added grade'});
      }
  });
  }

  //Exporting functions
  module.exports.getTeacherGraderPage = getTeacherGraderPage;
  module.exports.getStudentGraderPage = getStudentGraderPage;
  module.exports.getGrades = getGrades;
  module.exports.deleteGrade = deleteGrade;
  module.exports.updateGrade = updateGrade;
  module.exports.addGrade = addGrade;


  
