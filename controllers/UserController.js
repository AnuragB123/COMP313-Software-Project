let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// create a reference to the model
let Users = require('../models/user');

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

  // function to insert User into DB
module.exports.addUser= (req, res, next) => {
  
  let newuser = Users({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    userType: req.body.userType,
    phone: req.body.phone,
    isTutor: req.body.isTutor
  });

  Users.create(newuser, (err, newuser) =>{
    if(err)
    {
        console.log(err);
        res.end(err);
    }
    else
    {
      res.status(200).json({success: true, msg: 'Successfully added newuser'});
    }
});

}