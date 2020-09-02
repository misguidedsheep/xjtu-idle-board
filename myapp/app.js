var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var submitRouter = require('./routes/submit')
var database = require('./database');
const { time } = require('console');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 连接到数据库
database.connect();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


//提供静态文件
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.post('/index(.html)?', indexRouter);
app.post('/submit.html', submitRouter);
app.get('/base(.html)?', function(req, res){
  res.render('base');
})
// app.post('/submit.html', function(req, res){
//   var itemName = req.body.itemName;
//   console.log('itemName: ' + itemName);
//   console.log('description: ' + req.body.itemDesc);
//   res.end();
// })



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
  console.error(err)
});

module.exports = app;
