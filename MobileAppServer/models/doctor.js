const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const  passportLocalMongoose = require('passport-local-mongoose');



var patientReportSchema = new Schema({
    
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
         
    },
    date: {
        type:Date,
    },
});

var doctorSchema = new Schema({
    firstname: {
        type:String,
         
    },
    lastname: {
        type:String,
         
    },
    birthdate: {
        type:Date,
         
    },
    gender: {
        type:String,
         
    },
    email: {
        type:String,
         
    },
    speciality: {
        type:String,
         
    },
    reports:[patientReportSchema]
});

doctorSchema.plugin(passportLocalMongoose);
var Doctors = mongoose.model('Doctor',doctorSchema);
module.exports = Doctors;


