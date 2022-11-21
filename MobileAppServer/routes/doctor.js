var express = require('express');
var doctorRouter = express.Router();
var Patients = require('../models/patient');
var Doctors = require('../models/doctor');
var bodyParser = require('body-parser');

doctorRouter.use(bodyParser.json());

/* GET users listing. */
doctorRouter.route('/')

.get(   (req, res, next) => {

    Doctors.find({})
    .then( (doctors) =>{
        res.statusCode =200;
        res.setHeader('Content-Type','application/json');
        res.json(doctors);
    }, (err) => next(err) )
    .catch( (err) => next(err) );


})

.post(   (req, res, next) => {

    Doctors.findById(req.body.doctorId)
    .then( (doctor) =>{
        doctor.reports.push(req.body)
        doctor.save();
        console.log(doctor)
        res.statusCode =200;
        res.setHeader('Content-Type','application/json');
        res.json(doctor);

    }, (err) => next(err) )
    .catch( (err) => next(err) );


});


module.exports = doctorRouter;
