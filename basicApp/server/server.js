var express = require('express');
var bodyParser = require('body-parser');

var routes = require('./routes.js');
var http = require('http');


var app = express();

var server = http.createServer(app);

app.listen('3000', function(){
  console.log(' Server started at Port 3000.');
})
