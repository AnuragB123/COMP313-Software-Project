let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// create a reference to the model
let checklist  = require('../models/checklist');
let Checklist  = checklist.Checklist;




//-----------------------------------------------------Checklist operations----------------------------------------------------
getChecklist= (req, res, next) => {
    
    console.log(req.signedCookies.cookies.user._id);
    const user_id = req.signedCookies.cookies.user._id.toString();

    Checklist.find({ "userid":  user_id}, function(err, checkList) {
      if(err)
      {
          return console.error(err);
      }
      else
      {
        console.log(checkList);
        res.render('checklist', {messages: '' , data: checkList}); 
      }
  });
  }


postupdateChecklist= (req, res, next) => {
    let id = req.params.id;

    console.log(id);
    Checklist.updateOne(
        {_id: id},  // <-- find stage
        { $set: {    // <-- set stage
          userid: req.body.userid,
          title: req.body.title,
          status: req.body.status
          }}).then(result => {
            console.log("checkist updated");
            res.render("checklist", { messages: "Checklist Update successful!"});
      });
  }


postinsertChecklist = (req, res, next) => {

  console.log(req.signedCookies.cookies.user._id);
  const user_id = req.signedCookies.cookies.user._id.toString();

  let newchecklist = Checklist({
    userid: user_id,
    title: req.body.title,
    status: req.body.status
  });

  Checklist.create(newchecklist, (err, checkist) =>{
    if(err)
    {
        console.log(err);
        res.end(err);
    }
    else
    {
      console.log("checklist inserted");
      res.render("checklist", {success: true, messages: 'Successfully added checklist'});
    }
});
}

  // function to delete checklist
postdeleteChecklist = (req, res, next) => {
    let id = req.params.id;

    Checklist.deleteOne({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
          console.log("checkist deleted");
          res.render("checklist", {success: true, messages: 'Successfully Deleted Checklist item'});
        }
    });
}  


get_checklist_to_edit= (req, res, next) => {
    
  let id = req.params.id; 

  Checklist.findById( id, function(err, checkList) {
    if(err)
    {
        return console.error(err);
    }
    else
    {
      console.log(checkList);
      res.render('checklist', {messages: '' , data: checkList}); 
    }
});
}


module.exports.getChecklist = getChecklist
module.exports.postdeleteChecklist = postdeleteChecklist
module.exports.postupdateChecklist = postupdateChecklist
module.exports.get_checklist_to_edit = get_checklist_to_edit
module.exports.postinsertChecklist = postinsertChecklist
