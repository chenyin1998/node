var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');

/* 引入路由文件 */
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var chanpinRouter = require('./routes/chanpin');
var guanyuRouter = require('./routes/guanyu');
var zhaoshangRouter = require('./routes/zhaoshang');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html',ejs.__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 分配路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/chanpin', chanpinRouter);
app.use('/guanyu', guanyuRouter);
app.use('/zhaoshang', zhaoshangRouter);

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
