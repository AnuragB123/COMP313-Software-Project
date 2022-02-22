let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// create a reference to the model
let Grade  = require('../models/grade');

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
  
