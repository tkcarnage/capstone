'use strict';
const router = require('express').Router();
const mongoose = require('mongoose');
const Auth = require('../../utils/auth.middleware');
const Test = mongoose.model('Test');

module.exports = router;

router.get('/:testid', Auth.assertAuthenticated, function(req,res,next) {
    const testid = req.params.testid;
    Test.findById(testid)
    .then(function(test){
        res.json(test);
    })
    .catch(next);
});

router.post('/', Auth.assertAuthenticated, function(req,res,next) {
    Test.create(req.body)
    .then(function(test){
        res.json(test);
    })
    .catch(next);
});

router.put('/:testid', Auth.assertAuthenticated, function(req,res,next) {
    const testid = req.params.testid;
    Test.findById(testid)
    .then(function(test){
        test.set(req.body);
        return test.save();
    })
    .then(function(test){
        res.json(test);
    })
    .catch(next);
});

router.get('/', Auth.assertAuthenticated, function(req, res, next) {
    let queryObj = {};
    if (req.query.userId) queryObj = {user: req.query.userId};
    Test.find(queryObj)
    .populate('stack')
    .then(tests => res.json(tests))
    .catch(next);
});

router.delete('/:testid', Auth.assertAuthenticated, function(req, res, next){
   const testid = req.params.testid;
   Test.findById(testid).remove().exec()
   .catch(next);
});
