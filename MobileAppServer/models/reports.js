const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const  passportLocalMongoose = require('passport-local-mongoose');


reportsSchema.plugin(passportLocalMongoose);
var Reports = mongoose.model('Report',reportsSchema);
module.exports = Reports;


