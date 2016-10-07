var http = require('http');
var fs = require('fs');
var url = require('url');

//Create Server
http.createServer(function(req, res) {
	// var pathname = url.parse(req.url).pathname;
	// console.log(pathname);
	if(req.url == "/"){
		// pathname = "/index.html";
		console.log(req.url);
	}
	// console.log(" Request for '" + pathname + "' received." );

	fs.readFile('index.html', function(err, data) {
		if(err) {
			console.log(err);
			
			res.writeHead(404, {'Content-Type': 'text/html'});
			
		}
		else {
			//Page Found. HTTP Status: 200 : OK
			res.writeHead(200, {'Content-Type': 'text/html'});

			res.write(data);
		}
		res.end();
	});


}).listen(8082);

console.log('Server Running at http://127.0.0.1:8082/');