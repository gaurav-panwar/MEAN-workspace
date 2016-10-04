var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//for Authorization
var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var cfg = require('./authentic/config.js');


//Define the routes
var routes = require('./routes/index');
var users = require('./routes/users');
var chat = require('./routes/chat');

var app = express();


// view engine setup
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//change to ../../client for using angular (public for express)
app.use(express.static(path.join(__dirname, '../../client')));
app.use(passport.initialize());


//Define the routes
app.use('/', routes);
app.use('/users', users);
app.use('/chat', chat);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//Connect to Database
mongoose.connect('mongodb://localhost/collaba');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
  console.log('Connected to Database.');
});


//Initializing Jwt Strategy
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = cfg.jwtSecret;

passport.use(new JwtStrategy(opts, function(payload, done) {
  User.findOne({email:payload.email}, function(err, user) {
    if(err) done(err, false);
    
    if(user) done(null, user);
    else done(null, false);
  });
}));


/*//Define secure urls
app.get('/chat', passport.authenticate('jwt', 
  { 
    session:false, 
    successRedirect:"/chat",
    failureRedirect:"/users"
  }));*/

module.exports = app;
