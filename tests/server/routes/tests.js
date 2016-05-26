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

    let guestAgent;

    beforeEach('Create guest agent', function () {
        guestAgent = supertest.agent(app);
    });

    let userInfo = {
        email: 'joe@gmail.com',
        password: 'shoopdawoop'
    };

    let user;

    beforeEach('Create a user', function (done) {
        User.create(userInfo)
        .then(newUser => user = newUser)
        .then(() => done())
        .catch(console.error.bind(console));
    });

    let loggedInAgent;
    beforeEach('Create loggedIn user agent and authenticate', function (done) {
        loggedInAgent = supertest.agent(app);
        loggedInAgent.post('/login').send(userInfo).end(done);
    });

    let testInfo = {
        name: 'aNameForATest',
        user: user._id,
    };

    let test;
    beforeEach('Create a test', function (done) {
        Test.create(userInfo)
        .then(newUser => user = newUser)
        .then(() => done())
        .catch(console.error.bind(console));
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    describe('Get requests to api/:testId', function () {


        it('should get a 401 response if not logged in', function (done) {
            guestAgent.get('/api/tests/123')
                .expect(401)
                .end(done);
        });

        it('should return a 200 response and the updated user object', function (done) {

            user.phone = '123-456-7890';

            loggedInAgent.put('/api/users/' + user._id).send(user).expect(200).end(function (err, response) {
                if (err) return done(err);
                expect(response.body.phone).to.equal('123-456-7890');
                done();
            });
        });

    });

});
