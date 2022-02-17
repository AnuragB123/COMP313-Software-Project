let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// create a reference to the model
let Users = require('../models/user');
let Grade  = require('../models/grade');
let Checklist  = require('../models/checklist');




//-----------------------------------------------------Checklist operations----------------------------------------------------
module.exports.getChecklist= (req, res, next) => {
    
    Checklist.find((err, checkList) => {
      if(err)
      {
          return console.error(err);
      }
      else
      {
          res.status(200).json(checkList);
      }
  });
  }


  module.exports.updateChecklist= (req, res, next) => {
    let id = req.params.id;

    Checklist.updateOne(
        {_id: id},  // <-- find stage
        { $set: {    // <-- set stage
          userid: req.body.userid,
          title: req.body.title,
          status: req.body.status
          }}).then(result => {
        res.status(200).json({ message: "Checklist Update successful!"});
      });
  }



  // function to delete Grades
module.exports.deleteChecklist = (req, res, next) => {
    let id = req.params.id;

    Checklist.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
          res.status(200).json({success: true, msg: 'Successfully Deleted Checklist item'});
        }
    });
}  


//-----------------------------------------------------User operations---------------------------------------------------------
module.exports.findUser= (req, res, next) => {
    let email = req.params.email;

    Users.find({email : email},(err, usersList) => {
      if(err)
      {
          return console.error(err);
      }
      else
      {
          res.status(200).json(usersList);
      }
  });
  }
  

  module.exports.updateUsers= (req, res, next) => {
    let id = req.params.id;

    Users.updateOne(
        {_id: id},  // <-- find stage
        { $set: {    // <-- set stage
          username: req.body.userid,
          email: req.body.email,
          password: req.body.password,
          userType: req.body.userType,
          phone: req.body.phone,
          isTutor: req.body.isTutor
          }}).then(result => {
        res.status(200).json({ message: "User Update successful!"});
      });
  }


//-----------------------------------------------------Grade operations--------------------------------------------------------
// function to get Grades
module.exports.getGrades= (req, res, next) => {
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
module.exports.deleteGrade = (req, res, next) => {
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
module.exports.updateGrade = (req, res, next) => {
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
module.exports.addGrade= (req, res, next) => {
    Contact
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
  