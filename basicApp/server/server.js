var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var logger = require('morgan');
var mongoose = require('mongoose');

var routes = require('./routes.js');
var http = require('http');


var app = express();

/*var server = http.createServer(app);*/

mongoose.connect('mongodb://localhost/basicapp');

//Should've been controlled by front end routes
app.use('/', express.static(path.join(__dirname , '../client')));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
// setup the logger
app.use(logger('dev'));
app.use('/reg', routes);


app.listen('3000', function(){
  console.log(' Server started at Port 3000.');
});
