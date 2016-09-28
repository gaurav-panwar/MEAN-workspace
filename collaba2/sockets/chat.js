//socket file for chats
var onlineUsers = [];


module.exports = function(io) {

	io.on('connection', function(socket) {
		console.log('A socket has Connected.');
		

		socket.on('user-connected', function(userName) {
			socket.userName = userName;
			console.log('User Connected : ' + socket.userName);
			onlineUsers.push(socket.id);
		});
	});
}