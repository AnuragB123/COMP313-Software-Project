//Load User Controller
var users = require('../../COMP313-Software-Project/controllers/UserController');
var express = require('express');
var router = express.Router();

module.exports = function (app) {
    app.post('/', users.Create); //Create Method in Controller must be created
    //Users parameterized routes
    app.route('/users/:userId')
    .get(users.read) //Read Method in Controller must be created

    app.params('userId', users.userById) //Show Specific User Controller Function must be created

    app.post('/index', users.authenticate) //Authentication of User Function in Controller must be created
    app.get('/signOut',users.signout) //Signing out Functiin in Controller must be created

    app.get('/profile',users.profile) //Redirect to Profile Page Function in Controller must be created

}