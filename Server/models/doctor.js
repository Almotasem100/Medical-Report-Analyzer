const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DocSchema = new Schema({
	FirstName: {
		type: String,
		required: true
	},
	LastName: {
		type: String,
		required: true
	},
	Email: {
		type: String,
		required: true
	},
	Phone: {
		type: String,
		required: true
	},
	Speciality: {
		type: String,
		required: true
	},
	Password: {
		type: String,
		required: true
	},
	Gender: {
		type: String,
		required: true
	},
	BirthDate: {
		type: Date,
		required: true
	},
	ImagePath:{
		type:String,
		required:false
	}
});


module.exports = mongoose.model('Doctors', DocSchema);