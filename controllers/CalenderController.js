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
postinsertCalender = (req, res) => {

  console.log(req.body)
  const { calender } = req.body;
  const user_id = req.signedCookies.cookies.user._id.toString();
  console.log(req.signedCookies.cookies.user._id);
  console.log(calender)



  let newcalender = Calender({
    _id: calender,
    userid: user_id
  });

  Calender.create(newcalender, (err) =>{
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

getFinder = (req, res) => {
  res.render('calenderFinder', { messages: 'finder' });
}

postFinder = (req, res) => {
  let id = req.body.calender;
  Calender.findById({ _id: id }, (err, calender) => {
    console.log(calender)
    if (err) {
      console.log(err);
      res.end(err);
    }
    else {
      res.render('calender', { messages: 'calender', Calender: calender});
    }
  });
}

getCrud = (req, res) => {
  res.render('calenderCrud', { messages: 'crud' });
}

postCrud = (req, res) => {
  for (x in req.body) {}
  if (x === "register")
  {
    const { calender } = req.body;
    const user_id = req.signedCookies.cookies.user._id.toString();
    
    let newcalender = Calender({_id: calender, userid: user_id});

    Calender.create(newcalender, (err) =>{
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
  if (x === "delete")
  {
    let id = req.body.calender;
    Calender.deleteOne({ _id: id }, (err) => {
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
  res.render('calenderCrud', { messages: 'crud' });
}

getMenu = (req, res) => {
  res.render('calendermenu', { messages: 'menu' });
}


//Exporting all the function calls
module.exports.getCalender = getCalender
module.exports.postdeleteCalender = postdeleteCalender
module.exports.postinsertCalender = postinsertCalender
module.exports.getFinder = getFinder
module.exports.getCrud = getCrud
module.exports.getMenu = getMenu
module.exports.postCrud = postCrud
module.exports.postFinder = postFinder
