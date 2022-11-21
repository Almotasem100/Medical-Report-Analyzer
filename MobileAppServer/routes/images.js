var express = require('express');
var router = express.Router();
var Users = require('../models/user');
var bodyParser = require('body-parser');
var myApp = require('../app');
router.use(bodyParser.json());
var Patients = require('../models/patient');
const vision = require('@google-cloud/vision');
const serviveAccount=require('./gp-ocr-remon-new.json')
// Creates a client
const client = new vision.ImageAnnotatorClient({
    credentials:serviveAccount,
});


// var storage = myApp.storage;
// const upload = multer({storage: storage});
// multer
const multer = require('multer'); 

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function(req, file, cb) {
    cb(null,file.originalname);
  }
});
const upload = multer({storage: storage});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/upload',upload.array('fileData'), (req, res, next) => {
  console.log(req.files);
  
const imgName = 'public/images/'+ req.files[0].filename;
 //regex patterns
 let measurmentsPattern=/(?<Component>.{3,4}): +(?<Value>[0-9.]{2,5})/g;
 let namePattern=/Name (?<Name>[a-zA-Z]+ [a-zA-Z]+)/;
 let agePattern=/Age (?<Age>[0-9]{1,2})/;
 let datePattern=/(?<Date>\d{1,2}\/\d{1,2}\/\d{4})/;
 let genderPattern= /(?<Gender>Male|Female)/
 let commentsPattern=/COMMENTS (?<Comments>.*)/

 let data={
     name:"",
     age:"",
     gender:"",
     date:"",
     measurments:{},
     comments:""
 }
 let extractedText="";//the whole text 
 client.textDetection(imgName)
 .then(val => {
     const [result] =val
     const detections = result.textAnnotations;
     detections.forEach(txt =>  {
         extractedText=extractedText+txt.description+' '
     });
     //console.log(extractedText)
     // apply pattern matching 
     let measumentsMatches =[...extractedText.matchAll(measurmentsPattern)]
     measumentsMatches.forEach((match,i) => {
         data.measurments[match.groups.Component.trim()]=match.groups.Value
         //console.log(match.groups.Component.trim()+":"+match.groups.Value)
         
     });
     
     let nameMatch=extractedText.match(namePattern)
     //console.log(nameMatch[1])
     data.name=nameMatch[1]

    //  let ageMatch=extractedText.match(agePattern)
    //  //console.log(ageMatch[1])
    //  data.age=ageMatch[1]

    //  let genderMatch=extractedText.match(genderPattern)
    //  //console.log(genderMatch[0])
    //  data.gender=genderMatch[0]

    //  let dateMatch=extractedText.match(datePattern)
    //  //console.log(dateMatch[0])
    //  data.date=dateMatch[0]

     let commentsMatch=extractedText.match(commentsPattern)
     //console.log(commentsMatch[0])
     data.comment=commentsMatch[0]

     //console.log(data)
     //data=JSON.stringify(data) //convert js object to json
     //console.log(data)
     res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
     res.json(data);


    //  Patients.findById(req.user._id)
    // .then( (patient) =>{
    //     if(patient != null){
    //         patient.reports.push(data)
    //         patient.save()
    //         .then((patient) =>{
    //           console.log(patient)
    //             //res.statusCode =200;
    //             //res.setHeader('Content-Type','application/json');
    //             //res.json(patient);
    //         }, (err) => next(err));
    //     }
    //     else{
    //         err = new Error('patient' + req.user._id + ' Not Found');
    //         err.status = 404;
    //         console.log(err);
    //         //return next(err);
    //     }
    // }, (err) => next(err) )
    // .catch( (err) => next(err));

 }).catch(err => {
     console.log('error:',err)
 })

});

router.get('/download', (req, res) => {
  // console.log(req)
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, status: 'Registration Successful!'});

})


module.exports = router;
