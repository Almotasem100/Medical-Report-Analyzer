const express = require("express");
const router = express.Router();
const DoctorController = require("../controllers/doc-control");

router.get('/doctor/profile/:doctorId', DoctorController.viewProfile);


router.get('/doctor/dashboard/:doctorId', DoctorController.viewDashboard);


router.get('/report/response/:doctorId/:reportId/:patientId/:assignId', DoctorController.ResponseToReport);

router.get('/doctor/delete/:doctorId/:reportId', DoctorController.DeleteReport);


router.post('/doctor/response/:doctorId/:assignId', DoctorController.SendResponse);


module.exports = router;