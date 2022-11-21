const bcrypt =require('bcryptjs')
const Doctor = require("../models/doctor");
const Patient = require("../models/patient");
const moment = require('moment');

exports.signUpDoctor = (req, res, next) => {
  bcrypt.hash(req.body.password,12)
  .then(hashPass => {
    const doctor = new Doctor({
      FirstName: req.body.first_name,
      LastName: req.body.last_name,
      Email: req.body.email,
      Phone: req.body.phone,
      Speciality: req.body.speciality,
      Password: hashPass,
      ImagePath:req.file.filename,
      Gender: req.body.gender,
      BirthDate: moment(req.body.birth_date, "YYYY-MM-DD hh:mm:ss A Z").format("YYYY-MM-DD")
    });
    Doctor.find({$or:[{Email:doctor.Email},{Phone:doctor.Phone}]})
    .then(findDoctor => {
      if ((findDoctor.length ===0)){
        doctor
          .save()
          .then(doc => {
            console.log("Added New doctor");
            res.redirect(`/doctor/profile/${doc._id}`)
          })
          .catch(err => {
            console.log(err);
          });

      }else{
        res.render('signup',{layout:false,error:"Doctor Exists"})
      }
    })
  })
};

exports.signUpdPatient = (req, res, next) => {
  console.log(req.file);
  console.log(req.body.email)
  console.log(req.body.image)
  bcrypt.hash(req.body.password,12)
  .then(hashPass => {
    const patient = new Patient({
      // ImagePath:req.file.filename,
      FirstName: req.body.first_name,
      LastName: req.body.last_name,
      Email: req.body.email,
      Phone: req.body.phone,
      Password: hashPass,
      Gender: req.body.gender,
      BirthDate: moment(req.body.birth_date, "YYYY-MM-DD hh:mm:ss A Z").format("YYYY-MM-DD")
    });
    Patient.find({$or:[{Email:patient.Email},{Phone:patient.Phone}]})
    .then(findPatient => {
      if ((findPatient.length === 0)){
        patient
          .save()
          .then(pat => {
            console.log("Added New Patient");
            res.redirect(`/patient/profile/${pat._id}`)
          })
          .catch(err => {
            console.log("mongo",err);
          });
      }else
      {
        res.render('signup',{layout:false,error:"Patient Exists"})
      }
    })
    
  })
};

exports.signInDoctor =(req,res,next) => {

Doctor.findOne({Phone : req.body.phone})
.then(doctor => {
  if (doctor){    
    bcrypt.compare(req.body.password,doctor.Password)
    .then(result => {
      if(result){
        res.redirect(`/doctor/profile/${doctor._id}`)
      }
    })
  }
  else{
    res.redirect('/signin');
  }
})

}

exports.signInPatient =(req,res,next) => {

Patient.findOne({Phone : req.body.phone})
.then(patient => {
  if (patient){    
    bcrypt.compare(req.body.password,patient.Password)
    .then(result => {
      if(result){
        res.redirect(`/patient/profile/${patient._id}`)
      }
    })
  }
  else{
    res.redirect('/signin');
  }
}).catch(err => {
  console.log(err)
})
}