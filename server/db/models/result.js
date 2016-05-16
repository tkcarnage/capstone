'use strict';

const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    test: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Test'
    },
    validatorResults: {
        type: [Boolean] // true means validator passed
    },
    finalResult: Boolean,
    lastRun: Date
});

mongoose.model('Result', resultSchema);
