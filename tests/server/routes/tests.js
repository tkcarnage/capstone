'use strict';

// Instantiate all models
const mongoose = require('mongoose');
require('../../../server/db/models');
const User = mongoose.model('User');
const Test = mongoose.model('Test');

const expect = require('chai').expect;
const dbURI = 'mongodb://localhost:27017/testingDB';
const clearDB = require('mocha-mongoose')(dbURI);
const supertest = require('supertest');
const app = require('../../../server/app');

describe('Tests Route', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    // Create a user and a test
    let user,
        test,
        userInfo = {
            email: 'joe@gmail.com',
            password: 'shoopdawoop'
        };

    beforeEach('Create a user and a test', function (done) {
        User.create(userInfo)
        .then(newUser => {
            user = newUser;
            return newUser;
        })
        .then(newUser => ({ name: 'aNameForATest',
                            user: newUser._id,
                            method: 'GET',
                            url: 'https://www.getpostman.com/'}))
        .then(testInfo => Test.create(testInfo))
        .then(newTest => test = newTest)
        .then(() => console.log('made it to the end of the thens'))
        .then(() => done())
        .catch(console.error.bind(console));
    });

    // Create guest agent
    let guestAgent;

    beforeEach('Create guest agent', function () {
        guestAgent = supertest.agent(app);
    });

    // Create loggedInAgent
    let loggedInAgent;

    beforeEach('Create loggedIn user agent and authenticate', function (done) {
        loggedInAgent = supertest.agent(app);
        loggedInAgent.post('/login').send(userInfo).end(done)
        .catch(console.error.bind(console));
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    describe('get requests to /api/tests/:testId', function () {

        // Create a user and a test
        // let user,
        //     test,
        //     userInfo = {
        //         email: 'joe@gmail.com',
        //         password: 'shoopdawoop'
        //     };

        // beforeEach('Create a user and a test', function (done) {
        //     User.create(userInfo)
        //     .then(newUser => {
        //         user = newUser;
        //         return newUser;
        //     })
        //     .then(newUser => ({ name: 'aNameForATest',
        //                         user: newUser._id,
        //                         method: 'GET',
        //                         url: 'https://www.getpostman.com/'}))
        //     .then(testInfo => Test.create(testInfo))
        //     .then(newTest => test = newTest)
        //     .then(() => console.log('made it to the end of the thens'))
        //     .then(() => done())
        //     .catch(console.error.bind(console));
        // });

        it('should get a 401 response if not logged in', function (done) {
            guestAgent.get('/api/tests/' + test._id)
                .expect(401)
                .end(done);
        });

        it('should return a 200 response and the correct test', function (done) {
            loggedInAgent.get('/api/tests/' + test._id).expect(200).end(function (err, response) {
                if (err) return done(err);
                expect(response.body.name).to.equal('aNameForATest');
                done();
            });
        });
    });

    // xdescribe('post requests to /api/tests/', function () {

    //     let newTestInfo = {
    //         name: 'newTest',
    //         user: user._id,
    //         method: 'DELETE',
    //         url: 'https://www.newsite.com/'
    //     };

    //     it('should get a 401 response if not logged in', function (done) {
    //         guestAgent.post('/api/tests').send(newTestInfo)
    //             .expect(401)
    //             .end(done);
    //     });

    //     it('should return a 200 response and the new test', function (done) {

    //         loggedInAgent.post('/api/tests').send(newTestInfo).expect(200).end(function (err, response) {
    //             if (err) return done(err);
    //             expect(response.body.name).to.equal('newTest');
    //             done();
    //         });
    //     });
    // });

});
