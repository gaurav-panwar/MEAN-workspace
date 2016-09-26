var express = require('express');
var fs = require('fs');
var url = require('url');
var app = express();


app.get('/', function(req, res) {
	res.sendFile('../csvtojson/index.html');
});





app.post('/', function(req, res) {
	res.send('Got a POST Request.');
});




app.listen(3000, function() {
	console.log('Running Express Server on port 3000.');
});