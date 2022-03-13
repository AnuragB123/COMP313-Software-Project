let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// create a reference to the model
let Checklist  = require('../models/checklist');

//-----------------------------------------------------Checklist operations----------------------------------------------------
getChecklist= (req, res, next) => {
    
    Checklist.find((err, checkList) => {
      if(err)
      {
          return console.error(err);
      }
      else
      {
        res.render('checklist', {messages: '' , data: checkList}); 
      }
  });
  }


  postupdateChecklist= (req, res, next) => {
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
postdeleteChecklist = (req, res, next) => {
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


module.exports.getChecklist = getChecklist
module.exports.postdeleteChecklist = postdeleteChecklist
module.exports.postupdateChecklist = postdeleteChecklist
