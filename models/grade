const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const gradeSchema = mongoose.Schema({
    userid: {type: String,required: true},
    courseName: { type: String, required: true}, 
    grade: { type: String, required: true },
    marks: {type: Decimal128, required: true}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Grade", gradeSchema);