let calender  = require('../models/calender');
let Calender  = calender.Calender;
let Usermodel = require('../models/user');
let Users = Usermodel.User; 

module.exports = {
    testCase1: function () {
        let newcalender = Calender({
            _id: "this is a test",
            userid: 453
        })
        return newcalender._id;
    }
    ,
    testCase2: function () {
        return calender_id;
    }
    ,
    testCase3: function () {
        return Calender.find({ "userid": 4 });
    }
    ,
    testCase4: function () {
        return Users.find({ "userid": 1 });
    }
    ,
    testCase5: function () {
        let newUser = Users({
            username: "Jack",
            password: "somerandompassword1234!",
            email: "jackfrost@gmail.com",
            userType: "Teacher",
            phone: "18008008",
            isTutor: "False"
        })
        return newUser
    }
}