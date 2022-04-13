/*
Developers who contributed to this file:
Vaishali 
*/
//Third party libraries
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// create a reference to the model
let grade  = require('../models/grade');

let user = require('../models/user');

//-----------------------------------------------------Grade operations--------------------------------------------------------
// show teacher grader form, need to figure out how to pass the list of student users (need to work with Vaishali/Arpit)
getGraderPage = (req, res)=> {
  //Filter users who are user type student and then put them into a list and then pass this list as a paarameter... into the res.render
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

getTeacherGraderPage = (req, res)=> {
  //Filter users who are user type student and then put them into a list and then pass this list as a paarameter... into the res.render
  let user = '';

  try{
    console.log(req.signedCookies.cookies.user._id);
    user = req.signedCookies.cookies.user; 
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
    res.render('teacherGrader', {students: users}); 
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
      res.render('studentGrader', {grades: grades});
    })
  } else {
    console.log("grade table not found.")

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
  
// function to delete Grades
deleteGrade = (req, res, next) => {
    let id = req.params.id;

    grade.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
          res.render('grader', { messages: 'Grader' });
        }
    });
}  

// function to update a Grade
updateGrade = (req, res, next) => {
    let id = req.params.id
  
    grade.updateOne(
      {_id: id},  // <-- find stage
      { $set: {    // <-- set stage
        userid: req.body.userid,
        courseName: req.body.courseName,
        grade: req.body.grade,
        marks: req.body.marks
        }}).then(result => {
          res.render('grader', { messages: 'Grader' });
    });
  }

  // function to insert Grade into DB
addGrade= (req, res, next) => {
    
    let newgrade = grade({
      userid: req.body.userid,
      courseName: req.body.courseName,
      grade: req.body.grade,
      marks: req.body.marks
    });
  
    grade.create(newgrade, (err, grade) =>{
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
        res.render('grader', { messages: 'Grader' });
      }
  });
  }

  //Exporting functions
  module.exports.getGraderPage = getGraderPage;
  module.exports.getGrades = getGrades;
  module.exports.deleteGrade = deleteGrade;
  module.exports.updateGrade = updateGrade;
  module.exports.addGrade = addGrade;


  
