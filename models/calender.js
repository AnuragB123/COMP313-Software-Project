/*
Developers who contributed to this file:
Joseph Volpe 
*/
//Third party libraries
const mongoose = require("mongoose");
//Schema for Calender Item
const Calender = mongoose.Schema({
    _id: {type: String, required: "calender is required"},
    userid: {type: String, required: "userid is required"}
 
  }
  ,
      {
          collection: "Calenders"
      }
  );
  //Exporting the Calender model
module.exports.Calender = mongoose.model("Calender", Calender);
