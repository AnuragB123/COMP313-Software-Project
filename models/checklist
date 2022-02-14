const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const checklistSchema = mongoose.Schema({
    userid: {type: String,required: true},
    title: { type: String, required: true}, 
    status: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Checklist", checklistSchema);