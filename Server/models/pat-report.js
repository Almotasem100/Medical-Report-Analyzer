const mongoose = require('mongoose');

const Schema = mongoose.Schema;



const patientReportSchema = new Schema({
    
	PatientId: {
			type:String,
			 
	},
	reportId: {
			type:String,
			 
	},
	patientName: {
			type:String,
			 
	},
	gender: {
			type:String,
			 
	},
	email: {
			type:String,
			 
	}
});



module.exports = mongoose.model('Pat-report', patientReportSchema);
