const mongoose = require('mongoose');

var stackSchema = new mongoose.Schema({
	tests: [{type: mongoose.Schema.Types.ObjectId, ref: 'Test'}],
	// results: [{type: mongoose.Schema.Types.ObjectId, ref: 'Result'}], // result should be a property on each test, not the stack
	lastRun: {  
		type: Date,
		default: null
	} 
});

mongoose.model('Stack', stackSchema);

