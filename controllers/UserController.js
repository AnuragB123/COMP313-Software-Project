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

      //Add a Create User Function
  }