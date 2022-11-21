const mongoose = require("mongoose");
const moment = require("moment");
const Assign = require("../models/assign");
const Doctor = require("../models/doctor");
const Patient = require("../models/patient");
const Val = require("./val-control");
exports.viewProfile=(req,res,next) => {
  const doctorId=mongoose.Types.ObjectId(req.params.doctorId)
  Doctor.findById(doctorId).lean()
  .then(doctor => {
    if (doctor){
      doctor.BirthDate = moment(doctor.BirthDate, "YYYY-MM-DD hh:mm:ss A Z").format("DD/MM/YYYY");
      res.render('doctorProfile',{title:'My Profile', doctor:doctor, activeProfile:true, doctorId: doctorId});
    }
  }).catch(err => {
    console.log('view doctor profile:',err)
  })

};

exports.viewDashboard=(req,res,next) => {
  const doctorId=mongoose.Types.ObjectId(req.params.doctorId);
  let data = [];
  let asgn = [];
  let j =0;
  Assign.find({"doctorid":doctorId})
  .then(assignments => {
    for(let i=0; i<assignments.length; i++){
      asgn[i] = assignments[i];
      Patient.findById(asgn[j].patientid)
      .then(patient => {
        let report = patient.Reports.id(asgn[j].reportid);
        const UploadDate = moment(report.UploadDate, "YYYY-MM-DD hh:mm:ss A Z").format("DD/MM/YYYY");
        data.push({
          'report':report, 
          'fname':patient.FirstName, 
          'lname':patient.LastName, 
          'respond':asgn[j].Responded,
          'assignId':asgn[j]._id,
          'patid':patient._id,
          'response':asgn[j].Response,
          'upload': UploadDate
        });
        j++;
      })
    }
  })  
  .then(_ => {
    return Doctor.findById(doctorId);
  })
  .then(doctor  => {
    res.render('doc-dashboard', 
    {
      title:'My Reports', 
      activeDash:true,
      data:data,
      doctorId:req.params.doctorId,
      doctor:doctor
    })
  });
}

exports.ResponseToReport = (req, res, next) => {
  const reportId = mongoose.Types.ObjectId(req.params.reportId);
  const patientId = mongoose.Types.ObjectId(req.params.patientId);
  const doctorId = mongoose.Types.ObjectId(req.params.doctorId);
  const assignId = mongoose.Types.ObjectId(req.params.assignId);
  let Report = 0;
  let doctor = 0;
  let values = 0;
  Doctor.findById(doctorId)
  .then(doc => {
    doctor = doc;
    return Patient.findById(patientId);
  })
  .then(patient => {
    return patient.Reports.id(reportId)
  })
  .then(report => {
    Report = report;
    values = Val.GetValues(report);
    return Assign.findById(assignId)
  })
  .then(assign => {
    res.render('showReport', 
      {
        title:'View Assignmnent',
        info: Report,
        viewmode:true,
        doctor:doctor, 
        doctorId:doctorId, 
        assignId:assignId, 
        respo:assign.Response, 
        responded:assign.Responded,
        Idate: moment(Report.Date, "YYYY-MM-DD hh:mm:ss A Z").format("DD/MM/YYYY"),
        values:values
      });
  })
  .catch(err => console.log(err));
};

exports.DeleteReport = (req, res, next) => {
  const reportId = mongoose.Types.ObjectId(req.params.reportId);
  const doctorId = mongoose.Types.ObjectId(req.params.doctorId);
  Assign.findOneAndDelete({'doctorid':doctorId, 'reportid':reportId}).lean()
  .then(_ => {
    res.redirect(`/doctor/dashboard/${doctorId}`);
  })
  .catch(err => console.log(err));
};


exports.SendResponse= (req, res, next) => {
  const doctorId = mongoose.Types.ObjectId(req.params.doctorId);
  const assignId = mongoose.Types.ObjectId(req.params.assignId);
  Assign.findById(assignId)
  .then(assign => {
    assign.Response = req.body.response;
    assign.Responded = true;
    return assign.save();
  })
  .then(_ =>  res.redirect(`/doctor/dashboard/${doctorId}`));

};