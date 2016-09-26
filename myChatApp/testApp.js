var express = require('express');
var fs = require('fs');
var url = require('url');
var app = express();


app.get('/', function(req, res) {
	//res.send("Hello! This is my First Server using Express.");
	res.sendFile('../csvtojson/index.html');
	/*var pathname = url.parse(req.url).pathname;
	if(pathname == '/')
		pathname = '/index.html';
	pathname = '../csvtojson' + pathname;
	console.log('Request for path ' + pathname + 'received.');

	fs.readFile(pathname, function(err, data) {
		if(err) {
			console.log(err);
			
			res.writeHead(404, {'Content-Type': 'text/html'});//HTTP Status: 404: NOT FOUND
		}
		else {
			res.writeHead(200, {'Content-Type': 'text/html'});//Page Found. HTTP Status: 200 : OK

			res.write(data);
		}
		res.end();
	});*/
});





app.post('/', function(req, res) {
	res.send('Got a POST Request.');
});




app.listen(3000, function() {
	console.log('Running Express Server on port 3000.');
});