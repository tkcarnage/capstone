const mongoose = require('mongoose');

var stackSchema = new mongoose.Schema({
	tests: [{type: mongoose.Schema.Types.ObjectId, ref: 'Test'}],
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
				type: String,
				default: '*',
			},
			hour: {
				type: String,
				default: '*',
			},
			dayofmonth: {
				type: String,
				default: '*',
			},
			month: {
				type: String,
				default: '*',
			},
			dayofweek: {
				type: String,
				default: '*',
			},
		},
		
	}
});

mongoose.model('Stack', stackSchema);

