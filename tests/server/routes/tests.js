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

describe('Test Routes', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    // Create guest agent
    let guestAgent;

    beforeEach('Create guest agent', function () {
        console.log('creating guest agent');
        guestAgent = supertest.agent(app);
    });

    // Create a user and a test
    let user,
        test,

        userInfo = {
        email: 'joe@gmail.com',
        password: 'shoopdawoop'
    };

    console.log('userInfo:', userInfo);

    beforeEach('Create a user and a test', function (done) {
        console.log('creating the user and the test');
        User.create(userInfo)
        .then(newUser => {
            console.log('newUser:', newUser);
            user = newUser;
            return newUser;
        })
        .then(newUser => ({ name: 'aNameForATest',
                            user: newUser._id,
                            method: 'GET',
                            url: 'https://www.getpostman.com/'}))
        .then(testInfo => Test.create(testInfo))
        .then(newTest => test = newTest)
        .then(() => done())
        .catch(console.error.bind(console));
    });

    console.log('user in the beforeEach:', user);

    // Create loggedInAgent


    let loggedInAgent;

    beforeEach('Create loggedIn user agent and authenticate', function (done) {
        loggedInAgent = supertest.agent(app);
        loggedInAgent.post('/login').send(userInfo).end(done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    describe('get requests to /api/tests/:testId', function () {

        it('should get a 401 response if not logged in', function (done) {
            guestAgent.get('/api/tests/123')
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

    describe('post requests to /api/tests/', function () {

        console.log('user:', user);

        let newTestInfo = {
            name: 'newTest',
            user: user._id,
            method: 'DELETE',
            url: 'https://www.newsite.com/'
        };

        it('should get a 401 response if not logged in', function (done) {
            guestAgent.post('/api/tests').send(newTestInfo)
                .expect(401)
                .end(done);
        });

        it('should return a 200 response and the new test', function (done) {

            loggedInAgent.post('/api/tests').send(newTestInfo).expect(200).end(function (err, response) {
                if (err) return done(err);
                expect(response.body.name).to.equal('newTest');
                done();
            });
        });
    });

});
