	var socket = io();
	var userName = getUserName();
	console.log(userName);
	$('#chat-head').text(userName + ' - Chats');


	//Emit event that a User has connected.
	socket.emit('User-connected', {"userName": userName});

	socket.on('Online-users', function(data) {
		console.log('Event-Online-users ' + data);
		var li = "";
		data.forEach(function(di){
			li = li + "<li id='" + di.socketid + "' class=''>" + di.userName + "</li>";
		});//forEach
		//console.log(li);
		$('#ul-online-users').html(li);
	});

	//Get Username from Url
	function getUserName() {
		var userName = location.search.split('?');
		userName = userName[1].split('=')[1];
		return userName;
	}