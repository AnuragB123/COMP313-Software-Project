/*
Developers who contributed to this file:
Joseph Volpe 
*/
//Third party libraries
const mongoose = require("mongoose");
//Schema for Calender Item
const Calender = mongoose.Schema({
    userid: {type: String, required: "userid is required"},
    calender: {type: String,required: "calender is required"}
  }
  ,
      {
          collection: "Calender"
      }
  );
  //Exporting the Calender model
module.exports.Calender = mongoose.model("Calender", Calender);
