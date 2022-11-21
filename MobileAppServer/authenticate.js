var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var Patient = require('./models/patient');
var Doctor = require('./models/doctor');

passport.use( 'localPatient' , new localStrategy( Patient.authenticate() ));
passport.use( 'localDoctor' , new localStrategy( Doctor.authenticate() ));

passport.serializeUser(function(user, done) { 
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    if(user!=null)
      done(null,user);
  });

