/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/
'use strict';
var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = mongoose.model('User');
var Test = mongoose.model('Test');
var Stack = mongoose.model('Stack');
var Result = mongoose.model('Result');

// var wipeCollections = function () {
//     var removeUsers = User.remove({});
//     var removeStack = Stack.remove({});
//     var removeResult = Result.remove({});
//     var removeTest = Test.remove({});
 // var promiseArray = [removeTest, removeUsers, removeResult, removeStack];

let wipeCollections = function () {
    let collections = ['Result', 'Stack', 'Test', 'User'];
    let removeAll = collections.reduce(function(allDocuments, nextCollection) {
        return allDocuments.concat(mongoose.model(nextCollection).remove({}));
    }, []);
    return Promise.all(removeAll);

};

var seedUsers = function () {

    var user = { email: 'user@user.com', password: 'password' }
    console.log("USERS GOIN BE SEEDED");
    return User.create(user);

};


var validators = [{"name" : "newTest1", "func" : "function(response) {\n return true; \n}"}];
validators = JSON.stringify(validators);

var seedTests = function (user) {

    var test = [
        {
            name: 'test1',
            user: user._id,
            url: "https://httpbin.org/get",
            validators: validators


        },
        {
            name: 'test2',
            user: user._id,
            url: "https://httpbin.org/get",
            validators: validators


        },
        {
            name: 'test3',
            user: user._id,
            url: "https://httpbin.org/get",
            validators: validators


        },
        {
            name: 'test4',
            user: user._id,
            url: "https://httpbin.org/get",
            validators: validators


        },
        {
            name: 'test5',
            user: user._id,
            url: "https://httpbin.org/get",
            validators: validators


        },
        {
            name: 'test6',
            user: user._id,
            url: "https://httpbin.org/get",
            validators: validators


        },
        {
            name: 'test7',
            user: user._id,
            url: "https://httpbin.org/get",
            validators: validators


        },
        {
            name: 'test8',
            user: user._id,
            url: "https://httpbin.org/get",
            validators: validators


        },
        {
            name: 'test9',
            user: user._id,
            url: "https://httpbin.org/get",
            validators: validators
        }
    ]

    return Test.create(test);

};

connectToDb
    .then(function () {
        return wipeCollections();
    })
    .then(function () {
        return seedUsers();
    })
    .then(function (user) {
        return seedTests(user);
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    })
    .catch(function (err) {
        console.error(err);
        process.kill(1);
    });
