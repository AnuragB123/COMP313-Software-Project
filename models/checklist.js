const mongoose = require("mongoose");

const Checklist = mongoose.Schema({
    userid: {type: String, unique: true, required: "userid is required"},
    title: {type: String,required: "title is required"},
    status: { type: String, required: "status is required"}
  }
  ,
      {
          collection: "Checklist"
      }
  );
  

module.exports.Checklist = mongoose.model("Checklist", Checklist);
