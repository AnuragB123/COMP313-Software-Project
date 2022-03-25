/*
Developers who contributed to this file:
Vaishali 
*/

//Third party libraries
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
//Grader Schema
const gradeSchema = mongoose.Schema({
    userid: {type: String,required: true},
    courseName: { type: String, required: true}, 
    grade: { type: String, required: true },
    marks: {type: Decimal128, required: true}
});
//Uniquer Schema
userSchema.plugin(uniqueValidator);
//Exporting Model
module.exports = mongoose.model("Grade", gradeSchema);