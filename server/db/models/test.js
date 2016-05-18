var mongoose = require('mongoose');

var testSchema = new mongoose.Schema({
	created: {
		type: Boolean,
		enum: [true, false],
		default: false,
	},
	name: {
		type: String,
		default: null,
	},
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
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
  result: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Result'
  },
	response: {
		type: String,
		default: null
	},
	headers: {
		type: Object,
	},
    validators: {
        type: String //name of the validator, function string of the validator
    },
	body: {
		bodytype: {
			type: String,
			enum: ['form-data', 'x-www-form-urlencoded', 'raw'],
		},
		data: {
			type: String,
		},
		expectation: {
			type: String,
		},
		result: {
			type: String,
			enum: ['New','Passing', 'Failing'],
			default: 'New'
		}
	},
});

mongoose.model('Test', testSchema);
