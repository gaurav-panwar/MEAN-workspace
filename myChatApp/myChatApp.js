var express = require('express');
var http = require('http');
var fs = require('fs');


var PORT = 3000;

var app = express();
var httpServ = http.Server(app);
var io = require('socket.io')(httpServ);


app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
	console.log('A user connected.');

	socket.on('Chat Message', function(msg) {
		io.emit('Chat Message', msg);
	});

	socket.on('disconnect', function() {
		console.log('A user Disconnected.');
	});
});

httpServ.listen(PORT, function() {
	console.log('Chat Server running on port : ' + PORT + '.');
});
