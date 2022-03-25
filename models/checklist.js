/*
Developers who contributed to this file:
Vaishali 
*/
//Third party libraries
const mongoose = require("mongoose");
//Schema for Checklist Item
const Checklist = mongoose.Schema({
    userid: {type: String, required: "userid is required"},
    title: {type: String,required: "title is required"},
    status: { type: String, required: "status is required"}
  }
  ,
      {
          collection: "Checklist"
      }
  );
  //Exporting the Checklist model
module.exports.Checklist = mongoose.model("Checklist", Checklist);
