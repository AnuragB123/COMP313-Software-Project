/*
Developers who contributed to this file:
Vaishali 
*/
//Using third party libraries
let express = require('express');

// create a reference to the model
let Usermodel = require('../models/user');
let Users = Usermodel.User; 

//Getting the Checklist Page
getTutor = (req, res, next) => {
    
    let user_obj = '';

    try{
        // console.log(req.signedCookies.cookies.user._id);
        user_obj = req.signedCookies.cookies.user; 
    }
  
    catch(e){
        console.log('Unknown user');
        return res.render('index', {messages: ''});
    }

    if (user_obj.isTutor.toLowerCase() == "yes"){
        console.log('in yes');
        console.log(user_obj._id);

        Users.find({'Meeting.tutorname': user_obj.username}, {username: 1, Meeting: 1}, function(err, tutormeetings) {
            if(err)
            {
                return console.error(err);
            }
            else
            {
                console.log(tutormeetings);
                return res.render('tutorView', {messages: '' , meetingList : tutormeetings, allstudents : [], alltutors: [] ,isTutor : user_obj.isTutor});
            }
        });
      }
    
    else{
        Users.find({ "_id":  user_obj._id, select: 'meeting' }, function(err, meetingList) {
            if(err)
            {
                return console.error(err);
            }
            else
            {
                console.log(meetingList);

                Users.find({ "isTutor": 'yes', "userType": "student"}, {_id:1, username: 1}, function(err, alltutors) {
                    if(err)
                    {
                        return console.error(err);
                    }
                    else
                    {
                        console.log(alltutors);
                        console.log(meetingList);
                        return res.render('tuteeView', {messages: '' , "meetingList": meetingList, "allstudents": [], "alltutors": alltutors , "isTutor": user_obj.isTutor}); 
                  }
                }); 
            }
        });
    }
}  

insertMeeting= (req, res) => {
    let user_id = '';

    try{
        console.log(req.signedCookies.cookies.user._id);
        user_id = req.signedCookies.cookies.user._id; 
    }
    
    catch(e){
        console.log('Unknown user');
        return res.render('index', {messages: ''});
    }
    
    console.log(req.body.meeting);
    var ObjectId = require('mongodb').ObjectId;
    
    let query = {_id: ObjectId(user_id)};  // <-- find stage


    let update = { $push: {    // <-- set stage
        "Meeting": req.body.meeting
      }};

    let options = {
    "upsert": false
    };

    Users.updateOne(query, update, options).then(result =>{
          console.log("new meet inserted");
          res.render("tuteeView", {success: true, messages: 'Successfully added meeting', meetingList: [], allstudents: [], isTutor: "no", alltutors: []});
        
    }).catch(err => console.error(err));
}

module.exports.getTutor = getTutor
module.exports.insertMeeting = insertMeeting