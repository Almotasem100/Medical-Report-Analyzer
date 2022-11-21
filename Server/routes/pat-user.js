const express = require("express");
const router = express.Router();
const PatientController = require("../controllers/pat-control");
const ReportController = require("../controllers/images");

router.get('/patient/profile/:patientId', PatientController.viewProfile);


router.get('/patient/dashboard/:patientId', PatientController.viewDashboard);

router.get('/patient/newReport/:patientId', PatientController.newReport);

router.post('/patient/upload/:patientId', ReportController.ReportToOcr);

router.post('/patient/uploadform/:patientId', ReportController.SaveReport);

//reports--------------------------------------------------------------
router.get('/report/view/:reportId/:patientId', PatientController.ViewReport);

router.get('/report/edit/:reportId/:patientId', PatientController.EditReport);

router.get('/report/delete/:reportId/:patientId', PatientController.DeleteReport);

router.get('/report/assignto/:reportId/:patientId', PatientController.AssignTo);

router.post('/report/editform/:reportId/:patientId', ReportController.EditReport);

router.post('/report/assign/:patientId', PatientController.Assigned);
//info-------------------------------------------------------------------
router.get('/report/view/info/rbc/:patientId', PatientController.RbcInfo);

router.get('/report/view/info/hgb/:patientId', PatientController.HgbInfo);



module.exports = router;