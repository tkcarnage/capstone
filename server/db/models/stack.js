'use strict';

const mongoose = require('mongoose');
const Test = mongoose.model('Test');

var stackSchema = new mongoose.Schema({
	name: String,
    tests: [{type: mongoose.Schema.Types.ObjectId, ref: 'Test'}],
	// project: [{type: mongoose.Schema.Types.ObjectId, ref: 'Project'}],
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	lastRun: {
		type: Date,
		default: null
	}
});

stackSchema.methods.deleteTests = function() {
	let self = this;
	Test.remove({_id: {$in: this.tests}})
	.then(function() {
		return self;
	});
};

stackSchema.methods.associateTests = function() {

	let savePromises = this.tests.map(test => {
		test.stack = this._id;
		test.save();
	});

	Promise.all(savePromises)
	.then( () => this);
};

mongoose.model('Stack', stackSchema);
