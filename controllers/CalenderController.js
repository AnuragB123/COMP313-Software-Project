/* Developers who contributed to this file: Joseph Volpe */

//Using third party libraries
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// create a reference to the model
let calender  = require('../models/calender');
let Calender  = calender.Calender;

//-----------------------------------------------------Calender operations----------------------------------------------------
//Getting the Calender Page
getCalender= (req, res, next) => {
    
    console.log(req.signedCookies.cookies.user._id);
    const user_id = req.signedCookies.cookies.user._id.toString();

    Calender.find({ "userid":  user_id}, function(err, calender) {
      if(err)
      {
          return console.error(err);
      }
      else
      {
        console.log(calender);
        res.render('calender', {messages: '' , data: calender}); 
      }
  });
  }


//When User inserts a Calender item
postinsertCalender = (req, res, next) => {

  console.log(req.signedCookies.cookies.user._id);
  const user_id = req.signedCookies.cookies.user._id.toString();

  let newcalender = Calender({
    userid: user_id,
    string: req.body.title,
  });

  Calender.create(newcalender, (err, checkist) =>{
    if(err)
    {
        console.log(err);
        res.end(err);
    }
    else
    {
      console.log("calender inserted");
      res.render("calender", {success: true, messages: 'Successfully added calender'});
    }
});
}

// function to delete calender
postdeleteCalender = (req, res, next) => {
    let id = req.params.id;

    Calender.deleteOne({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
          console.log("calender deleted");
          res.render("calender", {success: true, messages: 'Successfully Deleted calender item'});
        }
    });
}  


//Exporting all the function calls
module.exports.getCalender = getCalender
module.exports.postdeleteCalender = postdeleteCalender
module.exports.postinsertCalender = postinsertCalender
