var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var collectRouter = require('./routes/collect');
const jwt = require("jsonwebtoken");

var app = express();

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type;Authorization');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

// 设置要访问资源的url必须经过token的验证才可访问
app.all("/manage/*", function (req, res, next) {
  const auth = req.get("Authorization");
  //console.log(auth);
  if (auth === ' '||auth===undefined) {
    res.json({
      success: false,
      note: "未提供token"
    })
  }
  try {
    jwt.verify(auth, "mickey_2020");
    next();
  } catch (error) {
    res.json({
      success: false,
      note: "token验证错误！请重新登录"
    })
  }
  // 验证通过，放行
  
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/static', express.static('public'))

app.use('/manage', indexRouter);
app.use('/users', usersRouter);
app.use('/colllect', collectRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
