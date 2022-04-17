let Usermodel = require('../../models/user');
let Users = Usermodel.User; 
let calender  = require('../../models/calender');
let Calender  = calender.Calender;
const nodeAssert = require('assert').assert;
const assert = require('chai').assert;
const testCase1 = require('../app').testCase1;
const testCase2 = require('../app').testCase2;
const calenderQuery = require('../app').testCase3;
const userQuery = require('../app').testCase4;
const buildUser = require('../app').testCase5;

describe('App', function () {
    it('should be "this is a test"', function () {
        let result = testCase1();
        assert.equal(result, "this is a test");
    });

    it('should be type string', function () {
        let result = testCase1()
        assert.typeOf(result, "string");
    });
    
    it('should return a calender/not null', function () {
        let result = calenderQuery()
        assert.notEqual(result, null);
        console.log(result);
    });
    
    it('should return a user/not null', function () {
        let result = userQuery()
        assert.notEqual(result, null);
         //console.log(result);
    });

    it('should be build a user/not null', function () {
        let result = buildUser()
        assert.notEqual(result, null);
        //console.log(result);
    });
});