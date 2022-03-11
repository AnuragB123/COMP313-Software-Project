let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');
const bcrypt = require("bcrypt");


// create a reference to the model
let Usermodel = require('../models/user');
let User = Usermodel.User; 

//-----------------------------------------------------User operations---------------------------------------------------------
// show login form
getLogin = (req, res)=> {
  res.render('index', {title: 'Login' , errors: ''}); 
}


// process login form
postLogin = (req, res)=> {
  let errors = [];
  let username= "vaishali.M";
  let password="vaishalinn";

  let fetchedUser;
  User.findOne({ username: username })
    .then(user => {
      if (!user) {
       res.render("index", {title: "Login Fail"});
      }
      fetchedUser = user;
    
      bcrypt.compare(password, user.password, function(err, data) {
        if(err){
          res.render("index", {title: "Login Fail"});   
        }
        if(data){
          res.render("index", {title: "Login Success"});
        } else {
          res.render("index", {title: "Login Fail"});
        }
      });
    }) 
}


// process registration form
postRegistration = (req, res) => {
  // const {username, email, password, usertype, phone, isTutor} = req.body;
  let username = "vaishali.M"
  let email = "vaish@mm.com"
  let password = "vaishalinn"
  let usertype = "student"
  let phone = "111-223"
  let isTutor = "no"

  bcrypt.hash(password, 10).then(hash => {
    const user = new User({
      username: username,
      phone: phone,
      email: email,
      isTutor: isTutor,
      userType: usertype,
      password: hash
    });
    user
      .save()
      .then(result => {
        res.render("index", {title: "user created"});
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
}


// process logout
getLogout = (req, res, next) => {
  req.logout();
  console.log('in getlogout');
  res.render('/', {title: 'Login' , errors: ''});
}


getIndex = (req, res, next) => {
  res.render('index', { title: 'Index', displayName: req.user ? req.user.displayName : '' });
}


module.exports.getLogin = getLogin
module.exports.getLogout = getLogout
module.exports.postLogin = postLogin
module.exports.getIndex = this.getIndex
module.exports.postRegistration = postRegistration