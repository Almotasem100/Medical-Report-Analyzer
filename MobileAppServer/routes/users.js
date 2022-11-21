var express = require('express');
var router = express.Router();
var Patients = require('../models/patient');
var Doctors = require('../models/doctor');
var bodyParser = require('body-parser');
var passport = require('passport');


var mongoose = require('mongoose')
var dola = new mongoose.Types.ObjectId();

router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup/patient', (req, res, next) => {
  console.log(req.body)
  Patients.register({username: req.body.username,  firstname:req.body.firstname,  lastname:req.body.lastname,
    birthdate: req.body.birthdate,  gender: req.body.gender ,email: req.body.email }, req.body.password,
  (err, user) =>{
    if(err){
      const error = new Error(err)
      error.status = 500;
      return next(err);
    }
    else {
      console.log("signup as a patient")
      passport.authenticate('local')(req, res, () => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        console.log(user)
        res.json({success: true, status: 'Registration Successful!'});
      }); 
    }
  });
});

router.post('/signup/doctor', (req, res, next) => {
  console.log(req.body)
  console.log("doctor ...")
  Doctors.register({username: req.body.username,  firstname:req.body.firstname,  lastname:req.body.lastname,
    birthdate: req.body.birthdate,  gender: req.body.gender ,email: req.body.email,speciality:req.body.speciality }, req.body.password,
  (err, user) =>{
    if(err){
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      console.log("signup as a doctor")
      passport.authenticate('local')(req, res, () => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        console.log(user)
        res.json({success: true, status: 'Registration Successful!'});
      }); 
    }
  });
});

router.post('/login/patient', passport.authenticate('localPatient') ,(req, res) => {

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    Patients.find({username:req.body.username},function (err, record) {
      res.json(record[0]);
      });  
})

router.post('/login/doctor', passport.authenticate('localDoctor') ,(req, res) => {
  //console.log(req.body)
  res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    Doctors.find({username:req.body.username},function (err, record) {
      res.json(record[0]);
      });  
})


router.get('/logout', (req, res, next) => {
  if (req.session){
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else{
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
})

module.exports = router;
