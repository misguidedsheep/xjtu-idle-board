var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var indexRouter = require('./routes/index');
var submitRouter = require('./routes/submit')
var toSubmitRouter = require('./routes/tosubmit')
var loginRouter = require('./routes/login')
var tologinRouter = require('./routes/tologin')
var getUserNameRouter = require('./routes/getUserName');
var saveimgRouter = require('./routes/saveimg');
var getItemInfoRouter = require('./routes/getItemInfo')
var database = require('./database');

var multer = require('multer');
var upload = multer({
  dest: 'public/upload/'
})


const { time, error } = require('console');
// const jwtAuth = require('./public/javascripts/jwtAuth');
const expressJwt = require('express-jwt');  
const jwt = require('jsonwebtoken');
const constant = require('./private/constant');
const { token } = require('morgan');
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


// app.all('*', function(req, res, next){
//   req.headers.authorization = 'window.localStorage.token';
//   next()
// })


//主页
app.use('/', indexRouter);
app.use('/index', indexRouter);

// 发布界面
app.get('/submit', submitRouter)
app.post('/submit', toSubmitRouter);

// 登录界面
app.get('/login', loginRouter);
app.post('/login', tologinRouter);

// ajax获取用户名
app.get('/getUserName', getUserNameRouter);

// 接收图片
app.post('/saveimg', upload.single('file') , saveimgRouter);

// 获取商品信息
app.get('/getItemInfo', getItemInfoRouter);

// app.use(expressJwt({
//   secret: 'ReinaSecretKey',
//   algorithms: ['HS256'],
//   user: 'Reina-a'
// }).unless({
//   path: ['/getToken']
// }));

app.get('/getToken', function(req, res){
  var resMsg = JSON.stringify({
      result: 'ok',
      token: jwt.sign ({
        // algorithm默认为HS256, 其实不加也行
        algorithm: 'HS256',
        //以秒表示或描述时间跨度zeit / ms的字符串。如60，"2days"，"10h"，"7d"，Expiration time，过期时间
        
        issuer: 'Reina',
        subject: 'normal',
        user_name: 'Reina',
        user_id: '0'
      }, constant.secretKey,
      {expiresIn: 5})
  });
  res.render('getToken', {
    resMsg: resMsg
  });
});


app.get('/getData', (req, res) => {
  res.render('getData');
})

app.get('/toAuth', (req, res) => {
  console.log(req.headers.authorization.replace('Bearer ', ''));
  res.redirect('/')
})


app.get('/testajax', function(req, res){
  // console.log(req.headers.authorization)
  let token = req.headers.authorization.replace('Bearer ', '')
  // // console.log(token)
  // // res.end('pend?')
  jwt.verify(token, constant.secretKey, (err, decoded) => {
    if (err){
      res.end('<a href="/login">请登录</a>')
      
    }else{
      res.end(decoded.id)
    }
  res.send('debug')
  })
  // let decoded = jwt.decode(token)
  // res.send(decoded.user_name);
})

// app.get('/getData', function(req, res){
//   //var token = req.body.token;
//   // console.log(req.user);

//   jwt.verify(token, "ReinaSecretKey", function(err, decoded) {
//     if (err) {
//         res.status(200).json(err)
//     } else {
//         res.status(200).json(decoded);
//     }
//   });
// });


app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {   
      //  这个需要根据自己的业务逻辑来处理（ 具体的err值 请看下面）
    res.status(401).send('invalid token...');
  }
});

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
  res.end(err);
});

module.exports = app;
