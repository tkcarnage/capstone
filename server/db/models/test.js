var mongoose = require('mongoose');

var testSchema = new mongoose.Schema({
	name: {
		type: String,
		default: null,
	},
	user: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
	// project: [{type: mongoose.Schema.Types.ObjectId, ref: 'Project'}], to be implemented after MVP
	method: {
		type: String,
		enum: ['GET', 'POST', 'PUT', 'DELETE'],
		default: 'GET',
		required: true,
	},
	url: {
		type: String,
		required: true,
	},
	params: {
	  type: Object,
	},
	authorization: {
		email: {
			type: String,
		},
		password: {
			type: String,
		},
	},
	prev: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Test'
	},
	next: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Test'
	},
	response: {
		type: Number,
		default: null
	},
	headers: {
		type: Object,
	},
	body: {
		bodytype: {
			type: String,
			enum: ['form-data', 'x-www-form-urlencoded', 'raw'],
		},
		expectation: {
			type: String,
		},
		result: {
			type: String,
			enum: ['New','Passing', 'Failing'],
			default: 'New'
		},
	},
});


mongoose.model('Test', testSchema);
