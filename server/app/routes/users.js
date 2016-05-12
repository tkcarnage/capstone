'use strict';
const router = require('express').Router();
const mongoose = require('mongoose');
const Auth = require('../../utils/auth.middleware');
const User = mongoose.model('User');


router.put('/:userId', Auth.assertAuthenticated, function(req,res,next) {
    User.findById(req.params.userId)
    .then(user => {
        user.set(req.body);
        return user.save();
    })
    .then(savedUser => res.json(savedUser))
    .catch(next);
});

module.exports = router;
