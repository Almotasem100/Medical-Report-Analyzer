const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const  passportLocalMongoose = require('passport-local-mongoose');

var assignSchema = new Schema({
    patientid: {
        type:Number,
        required:true
    },
    doctorid: {
        type:Number,
        required:true
    },
    reportid: {
        type:Number,
        required:true
    },
    comments: {
        type:String,
        required:true
    },
});

assignSchema.plugin(passportLocalMongoose);
var assignSchema = mongoose.model('Assign',assignSchema);
module.exports = Assigns;


