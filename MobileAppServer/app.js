var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var passport = require('passport');
var authenticate = require('./authenticate');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var imagesRouter = require('./routes/images');
var reporttRouter = require('./routes/reports');
var doctorRouter = require('./routes/doctor');
//sett up mongoose
var mongoos = require('mongoose');
var url = 'mongodb://localhost:27017/conFusion';
var connect= mongoos.connect(url,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true
  });

connect.then((db)=>{
  console.log("Connected correctly to server");
}, (err) => {console.log(err);} )




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//session
app.use(session({
  name: 'session-id',
  secret: '12345-67890-09876-54321',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}));

app.use(passport.initialize());
app.use(passport.session());



app.use('/', indexRouter);
app.use('/users', usersRouter);

function auth (req, res, next){
  //console.log(req.user);
  if(!req.user){
      var err = new Error('you are not authenticated!');
      err.status = 403;
      console.log('you are not authenticated!');
      return next(err);
    }
  else{
      next();
  }
}
app.use(auth);

app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname+'uploads')));


app.use('/image',imagesRouter);
app.use('/report',reporttRouter);
app.use('/doctor',doctorRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
