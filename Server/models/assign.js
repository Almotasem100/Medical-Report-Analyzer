const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var assignSchema = new Schema({
  patientid: {
      type:ObjectId,
      required:true
  },
  doctorid: {
      type:ObjectId,
      required:true
  },
  reportid: {
      type:ObjectId,
      required:true
  },
  Response: {
      type:String,
  },
  Responded:{
      type:Boolean,
      default:false
  }
});


module.exports = mongoose.model('Assign',assignSchema);
