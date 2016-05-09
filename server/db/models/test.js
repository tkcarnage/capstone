var mongoose = require('mongoose');

var testSchema = new mongoose.Schema({
	name: {
		type: String,
		default: null,
	},
	method: {
		type: String,
		enum: ['GET', 'POST', 'PUT', 'DELETE'],
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
		username: {
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
			enum: ['form-data', 'x-www-form-urlencoded'],
		},
		expectation: {
			type: String,
			required: true,
		},
		result: {
			type: String,
			enum: ['New','Passing', 'Failing'],
			default: 'New'
		},
	},
});


mongoose.model('Test', testSchema);
