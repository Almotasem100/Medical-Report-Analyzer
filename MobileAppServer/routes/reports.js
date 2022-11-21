const express = require('express');
const bodyParser = require('body-parser');

const Patients = require('../models/patient');
var Doctors = require('../models/doctor');

const reporttRouter = express.Router();

reporttRouter.use(bodyParser.json());

reporttRouter.route('/')


.post( (req, res, next) =>{
    console.log("req body",req.body);
    Patients.findById(req.body.patientId)
    .then( (patient) =>{
        if(patient != null){
            patient.reports.push(req.body)
            patient.save()
            .then((patient) =>{
                res.statusCode =200;
                res.setHeader('Content-Type','application/json');
                
                res.json(patient.reports);
            }, (err) => next(err));
        }
        else{
            err = new Error('patient' + req.body.patientId + ' Not Found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err) )
    .catch( (err) => next(err));
})

.get( (req, res, next) =>{
    //console.log("req body",req.body);
    //console.log(req.user);
    Patients.findById(req.user._id)
    .then( (patient) =>{
        if(patient != null){
            res.statusCode =200;
            res.setHeader('Content-Type','application/json');
            res.json(patient.reports);
        }
        else{
            err = new Error('patient' + req.body.patientId + ' Not Found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err) )
    .catch( (err) => next(err));

})

reporttRouter.route('/:reportId')
.delete( (req, res, next) =>{

    Patients.findById(req.user._id)
    .then( (patient) =>{
        if(patient != null){
            console.log("patient report",patient.reports.id(req.params.reportId),"will be deleted")
            patient.reports.id(req.params.reportId).remove();
            patient.save()
            .then((patient) =>{
                res.statusCode =200;
                res.setHeader('Content-Type','application/json');
                //console.log(patient.reports)
                res.json(patient.reports);
            }, (err) => next(err));
        }
        else{
            err = new Error('patient' + req.params.reportId + ' Not Found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err) )
    .catch( (err) => next(err));
})

reporttRouter.route('/doctorReports')
.post( (req, res, next) =>{
    //console.log("req body",req.body);
    //console.log(req.user);
    var reportsBack = [];
    req.body.map( (report) => {
        //console.log("report",report);
        Patients.findById(report.PatientId)
        .then( (patient) =>{
            //console.log("patient",patient)
            //console.log("report",patient.reports.id(report.reportId))
            if(patient != null){
                var reportback = {} 

                reportback = {report:patient.reports.id(report.reportId),
                    assignDate:  report.date}
                
                //console.log("reportdate",reportback);
                reportsBack.push( reportback );
            }

        }, (err) => next(err) )
        .catch( (err) => next(err));
        
    });
    setTimeout(() => {
        console.log("reportsBack",reportsBack);
        res.statusCode =200;
        res.setHeader('Content-Type','application/json');
        res.json(reportsBack);
        
    }, 500);
 
})

reporttRouter.route('/doctorReports/:reportId')
.delete( (req, res, next) =>{

    Doctors.findById(req.user._id)
    .then( (doctor) =>{
        if(doctor != null){
            doctor.reports.find((report) => report.reportId===req.params.reportId).remove();
            doctor.save()
            .then((doctor) =>{
                res.statusCode =200;
                res.setHeader('Content-Type','application/json');
                //console.log(doctor.reports)
                res.json(req.params.reportId);
            }, (err) => next(err));
        }
        else{
            err = new Error('doctor' + req.params.reportId + ' Not Found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err) )
    .catch( (err) => next(err));

})


module.exports = reporttRouter;