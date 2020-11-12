var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var PORT = 3000

const MONGO_URL = "mongodb://localhost:27017/";

mongoose.connect(MONGO_URL, { poolSize: 10 }).then(
  () => { console.log(`connected mongodb on ${MONGO_URL}`) },
  err => {
    console.error(err)
    console.log('%s MongoDB connection error. Please make sure MongoDB is running.')
    process.exit()
  }
)


var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

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

app.listen(PORT, () => {
  console.log('Running on http://localhost:' + PORT)
});
