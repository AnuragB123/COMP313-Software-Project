/*
Developers who contributed to this file:
Vaishali 
*/

//Third party libraries
const mongoose = require("mongoose");
//const uniqueValidator = require("mongoose-unique-validator");
//Grader Schema
const Grade = mongoose.Schema({
    userid: {type: String,required: true},
    courseName: { type: String, required: true}, 
    grade: { type: String, required: true },
    marks: {type: Number, required: true}
},
{
    collection: "Grades"
}

);

//Exporting Model
module.exports.Grade = mongoose.model("Grade", Grade);