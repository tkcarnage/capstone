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
const mongoose = require('mongoose');

var jobSchema = new mongoose.Schema({
	array: [{type: mongoose.Schema.Types.ObjectId, ref: 'Test'}],
	results: [{type: mongoose.Schema.Types.ObjectId, ref: 'Result'}],
	lastRun: {
		type: Date,
		default: null
	}
});

mongoose.model('Job', jobSchema);
