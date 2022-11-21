const express = require("express");
const expresshbs = require("express-handlebars");
const Handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const mongoose = require("mongoose");
const multer= require('multer');
const HomeRouter = require("./routes/home");
const PatientRouter = require("./routes/pat-user");
const DoctorRouter = require("./routes/doc-user");

const bodyparser = require('body-parser');
const app = express();



app.engine(
  'hbs',
  expresshbs({
    layoutsDir: 'views/layouts/',
    defaultLayout: 'main-layout',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    extname: 'hbs'
  })
);


app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(__dirname +'/public'));
app.set('view engine', 'hbs');
app.set('views', 'views');

const storage =multer.diskStorage({
  destination:(req,file,cb) => {
      cb(null,"./public/img")
  },
  filename:(req,file,cb) =>{
      cb(null,file.originalname);
  }
});

app.use(multer({storage:storage}).single("image"));




app.use(HomeRouter);
app.use(PatientRouter);
app.use(DoctorRouter);


mongoose
  .connect(
    'mongodb+srv://GP_db:CufeSbme@cluster0.hjrk5.mongodb.net/users',
		{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
  )
  .then(result => {
    // console.log(result);
    console.log('connected')
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });