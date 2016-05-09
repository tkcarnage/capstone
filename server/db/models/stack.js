const mongoose = require('mongoose');

var stackSchema = new mongoose.Schema({
	name: String,
    tests: [{type: mongoose.Schema.Types.ObjectId, ref: 'Test'}],
	// project: [{type: mongoose.Schema.Types.ObjectId, ref: 'Project'}],
	user: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
	lastRun: {
		type: Date,
		default: null
	},
	// use this model prop to direct the CRON job
	// the properties in frequency correspond to CRON timing properties
	// but on the front-end, we simply show "hourly" or "every day at 10:52 P.M."
	autorun: { //
		status: {
			type: Boolean,
		},
		frequency: {
			minute: {
				type: String, // (0-59, but user only sees time input field, so no need to validate generated data)
				default: '*', // asterisk covers all cases in CRON
			},
			hour: {
				type: String, // (0-23, see above)
				default: '*', // see above
			},
			dayofmonth: { // (1-31, see above)
				type: String,
				default: '*', // see above
			},
			month: {
				type: String, // (1-12, see above)
				default: '*', // see above
			},
			dayofweek: {
				type: String, // (0-6, Sunday is 0, see above)
				default: '*', // see above
			},
		},

	}
});

mongoose.model('Stack', stackSchema);

