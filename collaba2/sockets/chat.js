//socket file for chats
var onlineUsers = [];


module.exports = function(io) {

	io.on('connection', function(socket) {
		//console.log('A socket has Connected.');
		
		//User-connected event. Emit online users list.
		socket.on('User-connected', function(data) {
			socket.userName = data.userName;
			console.log('User Connected : ' + socket.userName);
			var existUser = false;//user already exists
			onlineUsers.forEach(function(user) {
				if(user.userName == socket.userName) {
					existUser = true;
					return ;
				}
			});
			if(!existUser) {
				onlineUsers.push({"socketid":socket.id, "userName":data.userName});
			}
			socket.emit('Online-users', onlineUsers);//emit the list of online users
		});//User-connected event

		//disconnect event
		socket.on('disconnect', function() {
			console.log(" User disconnected : " + socket.userName);
			onlineUsers.splice({"socketid":socket.id, "userName":socket.userName}, 1);
			console.log(onlineUsers);
			socket.emit('Online-users', onlineUsers);
		});
	});
}