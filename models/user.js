/*
Developers who contributed to this file:
Vaishali 
*/
//Third party libraries
const mongoose = require("mongoose");
let passport = require('passport');

const meetingSchema = new mongoose.Schema({
  tutorname: {type:String , required: "tutor Name is required"},
  course: {type: String, required: "course is required"}, 
  name : {type: String,required: "Meeting name is required"},
  description : {type: String,required: "description is required"},
  time: { type: String, required: "time is required"}
});


//User Schema
const User = mongoose.Schema({
  username: {type: String, unique: true, required: "username is required"},
  password: {type: String,required: "password is required"},
  email: { type: String, required: "email is required"}, 
  userType: { type: String, required: "userType is required" },
  phone: { type: String, required: "phone is required" },
  isTutor: { type: String, required: "isTutor is required" },
  Meeting: [meetingSchema]
    
  }   
,
    {
        collection: "Users"
    }
);

//Exporting Model
module.exports.User = mongoose.model("User", User);