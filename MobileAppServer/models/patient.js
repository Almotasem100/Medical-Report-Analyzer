const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const  passportLocalMongoose = require('passport-local-mongoose');


var reportsSchema = new Schema({
    RBC: {
        type:Number,
         
    },
    HGB: {
        type:Number,
         
    },
    НСТ: {
        type:Number,
         
    },
    MCV: {
        type:Number,
         
    },
    RDW: {
        type:Number,
         
    },
    WBC: {
        type:Number,
         
    },
    LYM: {
        type:Number,
         
    },
    LYMP: {
        type:Number,
         
    },
    MON: {
        type:Number,
         
    },
    MONP: {
        type:Number,
         
    },
    GRA: {
        type:Number,
         
    },
    GRAP: {
        type:Number,
         
    },
    PLT: {
        type:Number,
         
    },
    MPV: {
        type:Number,
         
    },
    PCT: {
        type:Number,
         
    },
    PDW: {
        type:Number,
         
    },
    MCH: {
        type:Number,
         
    },
    MCHC: {
        type:Number,
         
    },
    comment: {
        type:String,
         
    },
    appDate: {
        type:Date,
         
    },
    reportDate: {
        type:Date,
         
    },
    name:{
        type:String,
    },
    gender:{
        type:String,
    },
    age:{
        type:String,
    },
});

var patientSchema = new Schema({
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
    reports: [reportsSchema]
});

patientSchema.plugin(passportLocalMongoose);
var Patients = mongoose.model('Patient',patientSchema);
module.exports = Patients;


