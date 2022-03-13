const mongoose = require("mongoose");

const checklistSchema = mongoose.Schema({
    userid: {type: String,required: true},
    title: { type: String, required: true}, 
    status: { type: String, required: true }
});

module.exports = mongoose.model("Checklist", checklistSchema);