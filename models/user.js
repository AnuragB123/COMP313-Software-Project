const mongoose = require("mongoose");
let passport = require('passport');

const User = mongoose.Schema({
  username: {type: String, unique: true, required: "username is required"},
  password: {type: String,required: "password is required"},
  email: { type: String, required: "email is required"}, 
  userType: { type: String, required: "userType is required" },
  phone: { type: String, required: "phone is required" },
  isTutor: { type: String, required: "isTutor is required" }

}
,
    {
        collection: "Users"
    }
);


module.exports.User = mongoose.model("User", User);