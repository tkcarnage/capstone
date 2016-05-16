'use strict';

const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    test: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Test'
    },
    validatorResult: {
        type: [Boolean] // true means validator passed
    },
    lastRun: Date
});

mongoose.model('Result', resultSchema);
