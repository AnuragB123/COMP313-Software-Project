/*
Developers who contributed to this file:
Vaishali 
Arpit
*/
//Third party libraries
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// create a reference to the model
let grade  = require('../models/grade');

let user = require('../models/user');

//-----------------------------------------------------Grade operations--------------------------------------------------------
//Get Grader Page Conditional based on User Type
getGraderPage = (req, res)=> {
  let user;

  try{
    console.log(req.signedCookies.cookies.user._id);
    user = req.signedCookies.cookies.user; 
  }
  
  catch(e){
    console.log('Unknown user');
    return res.render('index', {messages: ''});
  }
  

  if(user.userType == 'teacher'){
    getTeacherGraderPage(req, res);
  } else {
    if(user.userType == 'student'){
      getStudentGraderPage(req, res);
    } else {
      res.render('teacherGrader', {messages: 'Error'});
    }
  }
}

//Teacher Grader Page
getTeacherGraderPage = (req, res)=> {
  let user_cookie = '';

  try{
    console.log(req.signedCookies.cookies.user._id);
    user_cookie = req.signedCookies.cookies.user; 
  }
  
  catch(e){
    console.log('Unknown user');
    return res.render('index', {messages: ''});
  }
  
  const User = user.User;
  User.find({ userType: 'student' })
    .then(users => {
      if (!users) {
       return res.render("teacherGrader", {students: {}, messages : "Welcome to teacher Dashboard"});
      }
    res.render('teacherGrader', {'students': users}); 
  })

}


// show student grader form
getStudentGraderPage = (req, res)=> {
  //Grader object of userid (user logged in)
  const Grade = grade.Grade;
  
  let user;

  try{
    console.log(req.signedCookies.cookies.user._id);
    user = req.signedCookies.cookies.user; 
  }
  
  catch(e){
    console.log('Unknown user');
    return res.render('index', {messages: ''});
  }

  console.log(user._id);
  if(Grade){
    Grade.find({ userid: user._id })
    .then(grades => {
      if (!grades) {
       return res.render("studentGrader", {students: {}, messages : "No grades found."});
      }
      let avg = 0;
      for(let i = 0 ; i < grades.length ; i++){
        avg = avg + grades[i].marks;
      }
      avg = avg / grades.length;
      res.render('studentGrader', {grades: grades, avg : avg.toFixed(2)});
    })
  } else {
    console.log("grade table not found.");

  }
  
}

// function to get Grades
getGrades= (req, res, next) => {
    
  let user = '';

  try{
    console.log(req.signedCookies.cookies.user._id);
    user = req.signedCookies.cookies.user; 
  }
  
  catch(e){
    console.log('Unknown user');
    return res.render('index', {messages: ''});
  }

    let uid = req.params.userid;

    grade.find({userid : uid},(err, gradesList) => {
      if(err)
      {
          return console.error(err);
      }
      else
      {
        res.render('grader', { messages: 'Grader' });
      }
  });
  }
  
// // function to delete Grades
// deleteGrade = (req, res, next) => {
//     let id = req.params.id;

//     grade.remove({_id: id}, (err) => {
//         if(err)
//         {
//             console.log(err);
//             res.end(err);
//         }
//         else
//         {
//           res.render('grader', { messages: 'Grader' });
//         }
//     });
// }  

// // function to update a Grade
// updateGrade = (req, res, next) => {
//     let id = req.params.id
  
//     grade.updateOne(
//       {_id: id},  // <-- find stage
//       { $set: {    // <-- set stage
//         userid: req.body.userid,
//         courseName: req.body.courseName,
//         grade: req.body.grade,
//         marks: req.body.marks
//         }}).then(result => {
//           res.render('grader', { messages: 'Grader' });
//     });
//   }

  // function to insert Grade into DB
addGrade= (req, res, next) => {
    console.log(req.body);
    let newgrade = new grade.Grade({
      userid: req.body.studentId,
      courseName: req.body.studentCourse,
      grade: req.body.studentGrade,
      marks: req.body.studentMark
    });
  
    newgrade.save(function (err, book) {
      if (err) return console.error(err);
      console.log("Grade added successfully.");
      getTeacherGraderPage(req, res);
    });
  }

  //Exporting functions
  module.exports.getGraderPage = getGraderPage;
  module.exports.getGrades = getGrades;
  //module.exports.deleteGrade = deleteGrade;
  //module.exports.updateGrade = updateGrade;
  module.exports.addGrade = addGrade;