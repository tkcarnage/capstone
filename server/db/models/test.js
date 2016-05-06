// **user**
// name
// email
// phone
// pairs
// collections
// jobs[jobs]



// ***JOBS***
// timing cronjob
// [test nodes]
// time - last run
// results[results obj]


// ***TEST***
// type(get/post)
// - prev test
// - next test
// -input
// -output
// method(jsify)
//'use strict'

var mongoose = require('mongoose');

var testSchema = new mongoose.Schema({
	prev: {
		type: Schema.Types.ObjectId,
		ref: 'Test'
	},
	next: {
		type: Schema.Types.ObjectId,
		ref: 'Test'
	},
	response: {
		type: Number,
		default: null
	},
	input: {},
	expectedOutput: {},
	realOutput: {}

	// testSchema.methods.passOrFail = function() {
	// 	//make sure to npm install diff https://www.npmjs.com/package/diff
	// 	var difference = JsDiff.diffJson(this.expectedOutput, this.realOutput);
	// 	if (difference.length === 0) {return true;}
	// 	return false;
	// }

	// testSchema.jsify = function(inputFunc) {
	// 	//do stuff here
	// }

});


mongoose.model('User', schema);
