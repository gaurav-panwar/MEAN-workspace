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
				onlineUsers.push({"socketId":socket.id, "userName":data.userName});
				console.log('Online-users : ', onlineUsers);
			}
			socket.emit('Online-users', onlineUsers);//emit the list of online users
		});//User-connected event


		//Chat Request Event
		socket.on('Chat-request', function(data) {
			socket.broadcast.to(data.receiverId).emit('Request-received', 
				{receiverId:data.receiverId, receiverName:uname, senderId:data.senderId, senderName:data.senderName});
		});

		//On Request Acceptance. Start Chat
		socket.on('Request-accepted', function(data) {
			var sId = getIdFromUsername(data.senderName);
			var rId = getIdFromUsername(data.receiverName);
			socket.emit('Start-chat', {senderId:sId, senderName:data.senderName, receiverId:rId, receiverName:receiverName});
		});

		//On Request Reject, Block Sender
		socket.on('Request-rejected', function(data) {
			socket.emit('Block-sender', {senderName:data.senderName, receiverName:data.receiverName});
		});


		//Chat Message event. Send message to appropriate Receiver
		socket.on('Chat-msg', function(data) {
			var rId = getIdFromUsername(data.receiverName);
			var sId = getIdFromUsername(data.senderName);
			socket.broadcast.to(rId).emit('Chat-msg', 
				{senderName: data.senderName, receiverName: data.receiverName, msg:data.msg}); 
		});



		//disconnect event
		socket.on('disconnect', function() {
			console.log(" User disconnected : " + socket.userName);
			onlineUsers.splice({"socketId":socket.id, "userName":socket.userName}, 1);
			console.log(onlineUsers);
			socket.emit('Online-users', onlineUsers);
		});
	});

	
	//Get the Id of the User from given UserName
	function getIdFromUsername(userName) {
		onlineUsers.forEach(function(tuser) {
			if(tuser.userName == userName)
				return tuser.socketId;
		});
	}
}