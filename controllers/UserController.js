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
  res.render('index', {messages: 'Login' , errors: ''}); 
}


// process login form
postLogin = (req, res)=> {
  let errors = [];
  
  const {username, password}= req.body;
  console.log(username, password);

  let fetchedUser;
  User.findOne({ username: username })
    .then(user => {
      if (!user) {
       return res.render("index", {messages: "Login Fail"});
      }
      
      fetchedUser = user;
      console.log(fetchedUser);

      bcrypt.compare(password, user.password, function(err, data) {
        if(err){
          return res.render("index", {messages: "Login Fail"});   
        }
        if(data){
          return res.render("profile", {messages: "Login Success", username: username, password: password,
          email: user.email, userType: user.userType, phone: user.phone, isTutor: user.isTutor});
        } else {
          return res.render("index", {messages: "Login Fail"});
        }
      });
    }) 
}

// show login form
getRegister = (req, res)=> {
  res.render('register', {messages: ''}); 
}

// process registration form
postRegistration = (req, res) => {
  const {username, email, password, usertype, phone, isTutor} = req.body;
  console.log(username, email, password, usertype, phone, isTutor)

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
        res.render("index", {messages: "user created. Now you can Login"});
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
  res.render('/', {messages: 'Login' , errors: ''});
}


getIndex = (req, res, next) => {
  res.render('index', { messages: 'Index', displayName: req.user ? req.user.displayName : '' });
}


module.exports.getLogin = getLogin
module.exports.getLogout = getLogout
module.exports.postLogin = postLogin
module.exports.getIndex = this.getIndex
module.exports.postRegistration = postRegistration
module.exports.getRegister = getRegister