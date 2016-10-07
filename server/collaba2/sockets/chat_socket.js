//socket file for chats
var ChatModel = require('../models/ChatModel');
var onlineUsers = [];


module.exports = function(io) {

	io.on('connection', function(socket) {
		//console.log('A socket has Connected.');

		
		//User-connected event. Emit online users list.
		socket.on('User-connected', function(data) {
			console.log('Event-User-connected ' + data);
			socket.userName = data.userName;
			console.log('User Connected : ' + socket.userName);
			var existUser = false;//user already exists
			onlineUsers.forEach(function(user) {
				if(user.userName == socket.userName) {
					user.socketId = socket.id;//Not sure(New socket is created every time you refresh)
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
			console.log('Event-Chat-request ' + data);
			socket.broadcast.to(data.receiverId).emit('Request-received', 
				{receiverId:data.receiverId, receiverName:data.receiverName, senderId:data.senderId, senderName:data.senderName});
		});

		//On Request Acceptance. Start Chat
		socket.on('Request-accepted', function(data) {
			console.log('Event-Request-accepted ' + data);
			var sId = getIdFromUsername(data.senderName);
			var rId = getIdFromUsername(data.receiverName);
			socket.emit('Start-chat', {senderId:sId, senderName:data.senderName, receiverId:rId, receiverName:data.receiverName});
			
			var new_conv;

			ChatModel.findOne({conversationId: {$in:[data.senderName + "-" + data.receiverName, data.receiverName + "-" + data.senderName]} }, 
				function(err, conv) {
					if(err) console.error(err);
					if(conv) {
						console.log('Conversation already present.');
					}
					else {
						new_conv = new ChatModel({
							conversationId: data.senderName + "-" + data.receiverName,
							user1:data.senderName,
							user2:data.receiverName 
						});
						
						new_conv.save(function() {
							console.log('New conversation saved.');
						});
					}//else
				});
		});

		//On Request Reject, Block Sender
		socket.on('Request-rejected', function(data) {
			console.log('Event-Request-rejected ' + data);
			socket.emit('Block-sender', {senderName:data.senderName, receiverName:data.receiverName});
		});


		//Chat Message event. Send message to appropriate Receiver
		socket.on('Chat-msg', function(data) {
			console.log('Event-Chat-msg ' + data);
			var rId = getIdFromUsername(data.receiverName);
			var sId = getIdFromUsername(data.senderName);

			socket.broadcast.to(rId).emit('Chat-msg', 
				{senderName: data.senderName, receiverName: data.receiverName, msg:data.msg});

			ChatModel.findOne({conversationId: {$in:[data.senderName + "-" + data.receiverName, data.receiverName + "-" + data.senderName]} }, 
				function(err, conv) {
					if(err) console.log(err);
					if(conv) {
						conv.conversation.push({sender:data.senderName, message:data.msg});
					}
					conv.save(function() {
						console.log('New Chat msg saved.');
					});
				});
		});



		//disconnect event
		socket.on('disconnect', function() {
			console.log('Event-disconnect');
			console.log(" User disconnected : " + socket.userName);
			//Remove disconnected user from Online users List
			removeOnlineUser(socket.userName);
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

	//Function to remove given User from the List of Online Users.
	function removeOnlineUser(userName) {
		for(var i=0; i<onlineUsers.length; ++i) {
			if(onlineUsers[i].userName == userName) {
				onlineUsers.splice(i, 1);
				break;
			}//if
		}//for
	}

	
}