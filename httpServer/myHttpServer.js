var http = require('http');
var fs = require('fs');
var url = require('url');

//Create Server
http.createServer(function(req, res) {
	res.writeHead(200, {'Content-Type':'text/plain'});
	res.end('Hello World');
}).listen(8085);

console.log('Server Running at http://127.0.0.1:8085/');