require('./models/init') //在初始化app.js文件开头就链接数据库
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
/* import config.js file about cookie setup */
var config = require('./config');
/* 验证用户信息 */
var auth = require("./middlewares/auth")
/* draw out  ejs public module*/
var expressLayouts = require('express-ejs-layouts');


// var index = require('./routes/index');
// var users = require('./routes/users');
//引入router 将route 分成两类 处理page的 还有处理数据的api
var api = require('./routes/route.api');
var page = require('./routes/route.page');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
/* use express-ejs-layouts */
app.use(expressLayouts);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
/* modify */
app.use(cookieParser(config.cookieName));
app.use(express.static(path.join(__dirname, 'public')));

/* 验证用户信息 */
app.use(auth.authUser);
app.use('/', page);
app.use('/api/v1',api);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
