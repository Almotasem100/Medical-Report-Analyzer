const mongoose = require("mongoose");
const moment = require("moment");
const Assign = require("../models/assign");
const Doctor = require("../models/doctor");
const Patient =require("../models/patient");
const Val = require('./val-control');


exports.viewProfile=(req,res,next) => {
  const patientId=mongoose.Types.ObjectId(req.params.patientId)
  Patient.findById(patientId)
  .then(patient => {
    let BirthDate = moment(patient.BirthDate, "YYYY-MM-DD hh:mm:ss A Z").format("DD/MM/YYYY");
    res.render('patientProfile',{title:'My Profile', patient:patient, activeProfile:true, patientId:patient._id, BDate:BirthDate});
  })
  .catch(err => {
    console.log('view patient profile:',err)
  });

}

exports.newReport=(req,res,next) => {
  const patientId=req.params.patientId
  Patient.findById(patientId)
  .then(patient => res.render('newReport', {title:'Add Report', activeForm:true,patientId:patientId, patient:patient}));
}

exports.viewDashboard=(req,res,next) => {
  const patientId=mongoose.Types.ObjectId(req.params.patientId);
  let data = [];
  let asgn = [];
  let pat = 0;
  let j = 0;
  Patient.findById(patientId)
  .then(patient => {
    pat = patient;
    return Assign.find({"patientid":patientId})
  })
  .then(assignments => {
    for(let i=0; i<assignments.length; i++){
      asgn[i] = assignments[i];
      Doctor.findById(asgn[j].doctorid)
      .then(doctor => {
        let report = pat.Reports.id(asgn[j].reportid)
        const UploadDate = moment(report.UploadDate, "YYYY-MM-DD hh:mm:ss A Z").format("DD/MM/YYYY");
        data.push({
          'report':report, 
          'fname':doctor.FirstName, 
          'lname':doctor.LastName, 
          'respond':asgn[j].Responded,
          'assignId':asgn[j]._id,
          'response':asgn[j].Response,
          'UploadDate':UploadDate
        });
      })
    }
  })
  .then(_ => {
    return Patient.findById(patientId).lean();
  })
  .then(p => {
    p.Reports.map(rep => rep.UploadDate = moment(rep.UploadDate, "YYYY-MM-DD hh:mm:ss A Z").format("DD/MM/YYYY"))
    res.render('dashboard', 
    {
        title:'My Reports', 
        activeDash:true,
        reports:p.Reports,
        info:data,
        patientId:req.params.patientId,
        patient:p
    });
  })
  .catch(err => console.log(err));
};

exports.ViewReport = (req, res, next) => {
  const reportId = mongoose.Types.ObjectId(req.params.reportId);
  const patientId = mongoose.Types.ObjectId(req.params.patientId);
  let values = 0;
  Patient.findById(patientId)
  .then(patient => {
    let report=patient.Reports.id(reportId);
    values = Val.GetValues(report);
    let IDate = moment(report.Date, "YYYY-MM-DD hh:mm:ss A Z").format("DD/MM/YYYY");
    if(report.Assigned){
      Assign.findOne({'reportid':report._id}).lean()
      .then(assign => {
        res.render('showReport',
        {title:'View Report',
          info: report, 
          viewmode:true, 
          patient:patient, 
          patientId:patientId, 
          Idate:IDate, 
          responded: true,
          respo:assign.Response,
          values: values
        }
      )});
    }
    else{
      res.render('showReport', {title:'View Report', info: report,viewmode:true, patient:patient, patientId:patientId, Idate:IDate, values:values});
    }
  })
  .catch(err => console.log(err));
};

exports.EditReport = (req, res, next) => {
  const reportId = mongoose.Types.ObjectId(req.params.reportId);
  const patientId = mongoose.Types.ObjectId(req.params.patientId);

  Patient.findById(patientId)
  .then(patient => {
    let report=patient.Reports.id(reportId) 
    report.Date = moment(report.Date, "YYYY-MM-DD hh:mm:ss A Z").format("YYYY-MM-DD");
    res.render('editreport', {title:'View Report', info: report,reportId:reportId,patientId:patientId, viewmode:false, patient:patient});
  })
  .catch(err => console.log(err));
};


exports.DeleteReport = (req, res, next) => {
  const reportId = mongoose.Types.ObjectId(req.params.reportId);
  const patientId = mongoose.Types.ObjectId(req.params.patientId);

  Patient.findById(patientId)
  .then(patient => {
    patient.Reports.id(reportId).remove()
    return patient.save()
  })
  .then(_ => {
    return Assign.findOneAndDelete({"reportid":reportId})
  })
  .then(_ => {
    res.redirect(`/patient/dashboard/${patientId}`);
  })
  .catch(err => console.log(err));
};

exports.AssignTo = (req, res, next) => {
  let patient = 0;
  Patient.findById(req.params.patientId)
  .then(pat => {
    patient = pat
    return Doctor.find().lean()
  })
  .then(doctors => {
      res.render('selectDoc', 
      {
        reportId: req.params.reportId,
        doctors:doctors, 
        patient:patient, 
        patientId:req.params.patientId,
        title:'Choose Doc'
      });
  })
  .catch(err => console.log(err));
};

exports.Assigned = (req, res, next) => {
  console.log(req.body.patid)
  const assign = new Assign({
      patientid: mongoose.Types.ObjectId(req.body.patid),
      doctorid: mongoose.Types.ObjectId(req.body.docid),
      reportid: mongoose.Types.ObjectId(req.body.reportid),
      Response: '-'
  });
  assign.save()
  .then(result => {
    return Patient.findById(req.body.patid);
  })
  .then(patient => {
    let report = patient.Reports.id(req.body.reportid);
    report.Assigned = true;
    return patient.save();
  })
  .then( result2 => {
    res.redirect(`/patient/dashboard/${req.body.patid}`);
  })
  .catch(err => console.log(err));
};

exports.RbcInfo = (req, res, next) => {
  Patient.findById(req.params.patientId)
  .then(patient => {
    res.render('rbc', {title:'RBC', patient:patient, patientId: patient._id});
  })
};

exports.HgbInfo = (req, res, next) => {
  Patient.findById(req.params.patientId)
  .then(patient => {
    res.render('hgb', {title:'HGB', patient:patient, patientId: patient._id});
  })
};


// exports.viewDashboard=(req,res,next) => {
//   const patientId=mongoose.Types.ObjectId(req.params.patientId);
//   let data = [];
//   let asgn = 0;
//   let pat = 0;
//   let report = 0;
//   Patient.findById(patientId).lean()
//   .then(patient => {
//     pat = patient;
//     for(let rep of patient.Reports){
//       console.log('here');  
//       rep.UploadDate = moment(rep.UploadDate, "YYYY-MM-DD hh:mm:ss A Z").format("DD/MM/YYYY");
//       if(rep.Assigned){
//         report = rep;
//         return Assign.findOne({"reportid":rep._id}).lean();
//       }
//     }
//   })
//   .then(assign => {
//     console.log("1");
//     asgn = assign;
//     return Doctor.findById(asgn.doctorid).lean();
//   })
//   .then(doctor => {
//     data.push({
//       'report':report, 
//       'fname':doctor.FirstName, 
//       'lname':doctor.LastName, 
//       'respond':asgn.Responded,
//       'assignId':asgn._id,
//       'response':asgn.Response,
//     });
//   })
//   .then(_ => {
//     console.log('2');
//     pat.Reports.map(rep => rep.UploadDate = moment(rep.UploadDate, "YYYY-MM-DD hh:mm:ss A Z").format("DD/MM/YYYY"));
//     console.log(data);
//     res.render('dashboard', 
//     {
//         title:'My Reports', 
//         activeDash:true,
//         reports:pat.Reports,
//         info:data,
//         patientId:req.params.patientId,
//         patient:pat
//     });
//   })
//   .catch(err => console.log(err));
// };
