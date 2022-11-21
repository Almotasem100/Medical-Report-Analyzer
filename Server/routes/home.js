const express = require("express");
const adminController = require("../controllers/admin");
const router = express.Router();

router.post('/signupDoctor', adminController.signUpDoctor);
router.post('/signupPatient', adminController.signUpdPatient);
router.post('/signinDoctor', adminController.signInDoctor);
router.post('/signinPatient', adminController.signInPatient);


router.get('/signin', (req, res, next) => {
    res.render('signin', {layout:false});
});


router.get('/signup', (req, res, next) => {
    res.render('signup', {layout:false});
});

router.get('/', (req, res, next) => {
    res.render('index', {layout:false});
});



module.exports = router;