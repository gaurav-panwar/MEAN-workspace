const http = require('http');
var fs = require('fs');
var url = require('url');
const PORT = 3000;

//Create Server
http.createServer(function(req, res) {
	var pathname = url.parse(req.url).pathname;
	
	if(pathname == "/")
		pathname = "/index.html";

	console.log(" Request for '" + pathname + "' received." );

	fs.readFile(pathname.substr(1), function(err, data) {
		if(err) {
			console.log(err);
			
			res.writeHead(404, {'Content-Type': 'text/html'});//HTTP Status: 404: NOT FOUND
		}
		else {
			res.writeHead(200, {'Content-Type': 'text/html'});//Page Found. HTTP Status: 200 : OK

			res.write(data);
		}
		res.end();
	});


}).listen(PORT);

console.log('Server Running at http://127.0.0.1:' + PORT + "/");