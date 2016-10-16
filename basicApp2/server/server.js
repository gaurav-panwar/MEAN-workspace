var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger = require('morgan');
var path = require('path');
var route = require('./routes');

var app = express();

//run logger
app.use(logger('dev'));
//connect to database
mongoose.connect('mongodb://localhost/basicapp');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../client')));

app.use('/', route);




app.listen('3000', function() {
	console.log('Server Running at port 3000.');
});

module.exports = app;