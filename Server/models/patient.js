const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var ReportsSchema = new Schema({
	Name:{
	  type:String,
	  required:true
	},
	Age:{
	  type:Number,
	  required:true
	},
	Gender:{
	  type:String,
	  required:true 
	},
	Date:{
	  type:Date,
	  required:true
	},
	RBC:{
	  type:Number,
	  required:false
	},
	HGB:{
	  type:Number,
	  required:false
	},
	HCT:{
	  type:Number,
	  required:false
	},
	MCV:{
	  type:Number,
	  required:false
	},
	MCH:{
	  type:Number,
	  required:false
	},
	MCHC:{
	  type:Number,
	  required:false
	},
	RDW:{
	  type:Number,
	  required:false
	},
	WBC:{
	  type:Number,
	  required:false
	},
	LYMP:{
	  type:Number,
	  required:false
	},
	LYM:{
	  type:Number,
	  required:false
	},
	MONP:{
	  type:Number,
	  required:false
	},
	MON:{
	  type:Number,
	  required:false
	},
	GRAP:{
	  type:Number,
	  required:false
	},
	GRA:{
	  type:Number,
	  required:false
	},
	PLT:{
	  type:Number,
	  required:false
	},
	MPV:{
	  type:Number,
	  required:false
	},
	PCT:{
	  type:Number,
	  required:false
	},
	PDW:{
	  type:Number,
	  required:false
	},
	comments:{
	  type:String,
	  required:true
	},
	ReportName:{
	  type:String,
	  required:true
	},
	Assigned:{
	  type:Boolean,
	  required:true
	},
	UploadDate:{
	  type:Date,
	  required:true
	}
  });

const PatSchema = new Schema({
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
	},
	Reports:[ReportsSchema]
});

module.exports = mongoose.model('Patients', PatSchema);