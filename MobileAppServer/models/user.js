const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const  passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
    admin: {
        type: Boolean,
        default: false
    },
    firstname: {
        type:String,
        required:true
    },
    surname: {
        type:String,
        required:true
    }
});

userSchema.plugin(passportLocalMongoose);
var Users = mongoose.model('User',userSchema);
module.exports = Users;


