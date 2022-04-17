/*
Developers who contributed to this file:
Vaishali
Arpit
Anurag 
Prajwal
*/

//third party libraries
let express = require('express');
const bcrypt = require("bcrypt");
var cookieParser = require('cookie-parser');
var cookieOptions = {
    signed: true,
    maxAge: 3000000
};

// create a reference to the model
let Usermodel = require('../models/user');
let Users = Usermodel.User; 

// show login form
getLogin = (req, res)=> {
  res.render('index', {messages: 'Login' }); 
}

// process login form
postLogin = (req, res)=> {
  /*if(!req.body.value.id_token){
    console.log("error");
  }*/
  if(req.body.value  === undefined){
    const {username, password}= req.body;
    console.log(username, password);
    let fetchedUser;
    Users.findOne({ username: username })
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
          let cookies = req.signedCookies.cookies;
          if (cookies) {
              cookies.user = user
          } else {
              cookies = {
                  user: user
              }
          }          
          res.cookie('cookies', cookies, cookieOptions);  
          return res.render("profile", {messages: "Login Success", username: username, password: password,
          email: user.email, userType: user.userType, phone: user.phone, isTutor: user.isTutor});
        } else {
          return res.render("index", {messages: "Login Fail"});
        }
      });
    });
  }

  else{
    const{id_token, data} = req.body.value;
    let fetchedUser;
    Users.findOne({ email: data.email })
    .then(user => {
      if(!user) {
        const password = id_token;
        bcrypt.hash(password, 10).then(hash => {
          const gUser = new Users({
            username: data.name,
            phone: data.phone,
            email: data.email,
            isTutor: "null",
            userType: "null",
            password: hash
          });
          gUser.save()
          .then( () => {
            user = gUser;
            console.log(`1: ${user}`);
            let cookies = req.signedCookies.cookies;
            if (cookies) {
              cookies.user = user
            } else {
              cookies = {
                user: user
              }
            } 
            res.cookie('cookies', cookies, cookieOptions); 
            return res.render('profile', {messages: "Google Login Success", username: user.username, password: user.password,
              email: user.email, userType: user.userType, phone: user.phone, isTutor: user.isTutor});         
          })
          .catch(err => {
            res.status(500).json({
              error: err
            });
          });        
        });
      }
      console.log(`2: ${user}`); 
      if(user){
        console.log(`3: ${user}`); 
        fetchedUser = user;
        console.log(fetchedUser);
        let cookies = req.signedCookies.cookies;
        if (cookies) {
          cookies.user = user
        } else {
          cookies = {
            user: user
          }
        } 
        res.cookie('cookies', cookies, cookieOptions); 
        return res.render('profile', {messages: "Google Login Success", username: user.username, password: user.password,
          email: user.email, userType: user.userType, phone: user.phone, isTutor: user.isTutor});
      } 
    });
  }
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
    const user = new Users({
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

//Update User Information
updateUsers= async (req, res, next) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = '';
  let userType = req.body.userType;
  let phone = req.body.phone;
  let isTutor = req.body.isTutor;
  let newPasswordText = password;

  console.log(req.body);

  let update;
  let newPassword;

  password = await bcrypt.hash(req.body.password, 10);

  update = { $set: {    // <-- set stage
    username : username,
    email : email,
    password : password,
    userType : userType,
    phone : phone,
    isTutor : isTutor
  }};

  console.log("update : " + update.$set);

  let query = {username: username};  // <-- find stage
  
  let options = {
    "upsert": false
 };
  Users.updateOne(query, update, options)
  .then(result => {
    if(result.matchedCount && result.modifiedCount) {
      console.log(`User Updated successfully!!!`);
      res.render("profile", {messages: "Profile Updated successfully!!!", username: username, password: newPasswordText,
          email: email, userType: userType, phone: phone, isTutor: isTutor});
    }
    
    })
    .catch(err => console.error(`Failed to update user: ${err}`))
}


// process logout
getLogout = (req, res, next) => {
  let cookies = req.signedCookies.cookies;
    cookies.user = null;
    res.cookie('cookies', cookies, cookieOptions)
  console.log('in getlogout');
  res.render('index', {messages: 'Login' , errors: ''});
}

//Getting the Index Page
getIndex = (req, res, next) => {
  res.render('index', { messages: 'Index', displayName: req.user ? req.user.displayName : '' });
}

// get profile page
getProfile = (req, res, next)=> {

  try{
    console.log(req.signedCookies.cookies.user._id);
    user_id = req.signedCookies.cookies.user._id.toString(); 
  }
  
  catch(e){
    console.log('Unknown user');
    return res.render('index', {messages: ''});
  }
 
  if(!user_id || user_id === null){
    res.render('index', {messages: 'Please login to see profile page.'}); 
  }

  Users.find({ "_id":  user_id}, function(err, user) {
    if(err)
    {
        return console.error(err);
    }
    else
    {
      user = user[0];
      res.render("profile", {messages: "User Updated successfully!!!", username: user.username, password: user.password,
          email: user.email, userType: user.userType, phone: user.phone, isTutor: user.isTutor});
    }
  });
}

//Exporting Functions Calls
module.exports.getLogin = getLogin
module.exports.getLogout = getLogout
module.exports.postLogin = postLogin
module.exports.getIndex = this.getIndex
module.exports.postRegistration = postRegistration
module.exports.getRegister = getRegister
module.exports.updateUsers = updateUsers
module.exports.getProfile = getProfile