var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var basicAuthen = require('./configs/basic-auth')
var indexRouter = require('./routes/index');
var PORT = 3000

const MONGO_URL = "mongodb://localhost:27017/";

mongoose.connect(MONGO_URL,  { useNewUrlParser: true }).then(
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
app.use(basicAuthen);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  if (typeof (err) === 'string') {
    // custom application error
    return res.status(400).json({ message: err });
  }

  // default to 500 server error
  return res.status(500).json({ message: err.message });
});

app.listen(PORT, () => {
  console.log('Running on http://localhost:' + PORT)
});
