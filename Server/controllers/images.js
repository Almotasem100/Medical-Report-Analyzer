const moment = require("moment");
const path = require("path");
var root = path.dirname(require.main.filename);
const Report = require("../models/report");
const Patient=require("../models/patient")
const vision = require('@google-cloud/vision');
const serviveAccount=require('../routes/gp-ocr-remon-new.json');
const mongoose = require("mongoose");
const { info } = require("console");
// Creates a client
const client = new vision.ImageAnnotatorClient({
    credentials:serviveAccount,
});



exports.SaveReport = (req, res, next)=>{

  const patientId=mongoose.Types.ObjectId(req.params.patientId)

  console.log("save report ");
  const report = new Report({
    Name: req.body.name,
    Age: req.body.age,
    Gender: req.body.gender,
    Date: req.body.issue_date,
    RBC: req.body.rbc,
    HGB: req.body.hgb,
    MCV: req.body.mcv,
    MCH: req.body.mch,
    HCT: req.body.hct,
    MCHC: req.body.mchc,
    RDW: req.body.rdw,
    WBC: req.body.wbc,
    LYMP: req.body.lymp,
    LYM: req.body.lym,
    MONP: req.body.monp,
    MON: req.body.mon,
    GRAP: req.body.grap,
    GRA: req.body.gra,
    PLT: req.body.plt,
    MPV: req.body.mpv,
    PCT: req.body.pct,
    PDW: req.body.pdw,
    comments: req.body.comments,
    ReportName: req.body.report_name,
    Assigned: false,
    UploadDate: moment().format("YYYY-MM-DD")
  });
  Patient.findById(patientId)
  .then(patient => {
    if(patient){
      patient.Reports.push(report)
      patient.save()
      .then( pat => {
        res.redirect(`/patient/dashboard/${pat._id}`);
      })
    }
  })
};

exports.EditReport = (req, res, next) => {
  const reportId = mongoose.Types.ObjectId(req.params.reportId);
  const patientId = mongoose.Types.ObjectId(req.params.patientId);
  Patient.findById(patientId)
  .then(patient => {
    patient.Reports.id(reportId).Name = req.body.name;
    patient.Reports.id(reportId).Age = req.body.age;
    patient.Reports.id(reportId).Gender = req.body.gender;
    // patient.Reports.id(reportId).Date = req.body.issue_date;
    patient.Reports.id(reportId).RBC = req.body.rbc;
    patient.Reports.id(reportId).HGB = req.body.hgb;
    patient.Reports.id(reportId).MCV = req.body.mcv;
    patient.Reports.id(reportId).MCH = req.body.mch;
    patient.Reports.id(reportId).HCT = req.body.hct;
    patient.Reports.id(reportId).MCHC = req.body.mchc;
    patient.Reports.id(reportId).RDW = req.body.rdw;
    patient.Reports.id(reportId).WBC = req.body.wbc;
    patient.Reports.id(reportId).LYMP = req.body.lymp;
    patient.Reports.id(reportId).LYM = req.body.lym;
    patient.Reports.id(reportId).MONP = req.body.monp;
    patient.Reports.id(reportId).MON = req.body.mon;
    patient.Reports.id(reportId).GRAP = req.body.grap;
    patient.Reports.id(reportId).GRA = req.body.gra;
    patient.Reports.id(reportId).PLT = req.body.plt;
    patient.Reports.id(reportId).MPV = req.body.mpv;
    patient.Reports.id(reportId).PCT = req.body.pct;
    patient.Reports.id(reportId).PDW = req.body.pdw;
    patient.Reports.id(reportId).comments = req.body.comments;
    patient.Reports.id(reportId).ReportName = req.body.report_name;
    patient.save()
    .then(
      res.redirect(`/patient/dashboard/${patientId}`)
    )
  })
  .catch(err => {
    console.log(err);
  });
};

exports.ReportToOcr = (req, res, next) => {
  const patientId=req.params.patientId  
  //
  const imgName = path.join(root,req.file.path);
  //regex patterns
  let measurmentsPattern=/(?<Component>.{3,4}): +(?<Value>[0-9.]{2,5})/g;
  let namePattern=/Name (?<Name>[a-zA-Z]+ [a-zA-Z]+)/;
  let agePattern=/Age (?<Age>[0-9]{1,2})/;
  let datePattern=/(?<Date>\d{1,2}\/\d{1,2}\/\d{4})/;
  let genderPattern= /(?<Gender>Male|Female)/
  let commentsPattern=/COMMENTS (?<Comments>.*)/;

  let data={
    name:"",
    age:"",
    gender:"",
    date:"",
    measurments:{},
    comments:"",
    report_name: req.body.report_name,
    imgpath: "img/" + req.file.originalname
  };

  let extractedText="";//the whole text 
  client.textDetection(imgName)
    .then(val => {

      const [result] =val
      const detections = result.textAnnotations;
      detections.forEach(txt =>  {
          extractedText=extractedText+txt.description+' '
      });
      console.log(extractedText)
      // apply pattern matching 
      let measumentsMatches =[...extractedText.matchAll(measurmentsPattern)]
      measumentsMatches.forEach((match,i) => {
        data.measurments[match.groups.Component.trim()]=match.groups.Value
        //console.log(match.groups.Component.trim()+":"+match.groups.Value) 
      });
      
      let nameMatch=extractedText.match(namePattern)
      data.name=nameMatch[1];

       let ageMatch=extractedText.match(agePattern)
       if(ageMatch){
         data.age=ageMatch[1]
       }else{
         data.age=10
       }


      let genderMatch=extractedText.match(genderPattern)
      data.gender=genderMatch[0]

      let dateMatch=extractedText.match(datePattern)
      let newdate = moment(dateMatch[1], "DD/MM/YYYY").format("YYYY-MM-DD");
      data.date=newdate;

      let commentsMatch=extractedText.match(commentsPattern)
      data.comments=commentsMatch[0]
      
      data.imgpath='/'+data.imgpath
      console.log(data)
      return Patient.findById(patientId);


    })
    .then(patient => res.render('reportForm', {info:data,patientId:patientId, patient:patient}))
    .catch(err => {
      console.log('error:',err)
    });
};

