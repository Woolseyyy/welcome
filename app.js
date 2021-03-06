var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var qiniu = require("qiniu");

//qiniu store config
qiniu.conf.ACCESS_KEY = 'gohvHrDfcSFbZw1goJ1XxbWQVRDPpPoi_ucHpByn';
qiniu.conf.SECRET_KEY = '6QoI3V9WMh5FLqCMk1ijmcUiFunZPnTzLKU73IkS';
uptoken = new qiniu.rs.PutPolicy('files');//'files' is bucket name


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/welcome');
mongoose.connection.on('error',function(err){
    console.log(err);
});


var api = require('./routes/api');
var app = express();


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//建立session，并将session存入mongodb
app.use(session({
    secret: 'SECRET_KEY',
    cookie:{maxAge: 365 * 24 * 60 * 60},//过期时间
    key: 'SessionID',
    resave: true,
    saveUninitialized: true,
    store : new MongoStore({
    mongooseConnection: mongoose.connection //使用已有数据库连接
    //db : mongoose.connection.db
    })
}));

app.use('/', api);

module.exports = app;
