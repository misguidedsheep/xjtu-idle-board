// 引入 node_modules
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer = require('multer');
var upload = multer({
  dest: 'public/upload/'
})

// 引入路由
var indexRouter = require('./routes/index');
var submitRouter = require('./routes/submit')
var toSubmitRouter = require('./routes/tosubmit')
var loginRouter = require('./routes/login')
var tologinRouter = require('./routes/tologin')
var myhomeRouter = require('./routes/myhome')
var getUserNameRouter = require('./routes/getUserName');
var saveimgRouter = require('./routes/saveimg');
var getItemInfoRouter = require('./routes/getItemInfo');
var getUserInfoRouter = require('./routes/getUserInfo');
var getUserItemInfoRouter = require('./routes/getUserItemInfo');
var getItemUserInfoRouter = require('./routes/getItemUserInfo');
var modifyUserInfoRouter = require('./routes/modifyUserInfo');
var changeItemStatusRouter = require('./routes/changeItemStatus');
var registerRouter = require("./routes/register");
var toRegisterRouter = require("./routes/toRegister")
var registerVerifyRouter = require("./routes/registerVerify");

var app = express();

// 连接到数据库
var database = require('./database');
database.connect();


// 设置 view engine (使用 ejs)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// ↓--通用路由--↓ //
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// ↑--通用路由--↑ //


// ↓--自定义路由--↓ //
//主页
app.use('/', indexRouter);
app.use('/index', indexRouter);
// 发布界面
app.get('/submit', submitRouter)
app.post('/submit', toSubmitRouter);
// 登录界面
app.get('/login', loginRouter);
app.post('/login', tologinRouter);
// 注册界面
app.get('/register', registerRouter);
app.post('/register', toRegisterRouter);
// 注册验证
app.get('/verify', registerVerifyRouter);
// 用户界面
app.get('/myhome', myhomeRouter);
// ajax获取用户名
app.get('/getUserName', getUserNameRouter);
// 接收图片
app.post('/saveimg', upload.single('file'), saveimgRouter);
// 获取商品信息
app.get('/getItemInfo', getItemInfoRouter);
// 获取用户信息
app.get('/getUserInfo', getUserInfoRouter);
// 获取用户发布的商品信息
app.get('/getUserItemInfo', getUserItemInfoRouter);
// 获取商品对应用户的信息
app.get('/getItemUserInfo', getItemUserInfoRouter);
// 修改用户信息
app.get('/modifyUserInfo', modifyUserInfoRouter);
// 修改商品状态
app.get('/changeItemStatus', changeItemStatusRouter);
// ↑--自定义路由--↑ //


// ↓--错误处理路由--↓ //
// ! 捕获404错误并交给错误处理程序
app.use(function (req, res, next) {
  next(createError(404));
});
// 错误处理程序
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.error(err)
  res.end(err);
});
// ↑-错误处理路由--↑ //

module.exports = app;
