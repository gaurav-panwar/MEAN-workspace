$(function() {


	//JS file for Client side socket handling
	var socket = io();
	var userName = getUserName();
	console.log(userName);
	$('#chat-head').text(userName + ' - Chats');


	//Emit event that a User has connected.
	socket.emit('User-connected', {"userName": userName});


	//On receiving an Online user event Append to List
	socket.on('Online-users', function(data) {
		console.log('Event-Online-users ' + data);
		var li = "";
		data.forEach(function(di) {
			li = li + "<li id='" + di.socketId + "' class='online'>" + di.userName + "</li>";
		});//forEach
		//console.log(li);
		$('#ul-online-users').html(li);
	});

	//On click on an Online User - Send Chat Request
	$('#ul-online-users > li').on('click', function() {
		var recId = $(this).attr('id');
		console.log(recId);
		socket.emit('Chat-request', 
			{senderId: socket.id, senderName:socket.userName, receiverId: recId, receiverName:$(this).text()});
	});

	//On Request Receive event, Create request box.
	socket.on('Request-received', function(data) {
		var req = "<p id='div-chat-request' data-id='" + data.senderName + "-" + data.receiverName +
				"'> You have received a Chat-request from " + data.senderName + ". " +
				"<button type='button' id='btn-accept-req'>Accept</button>" +
				"<button type='button' id='btn-reject-req'>Reject</button> </p>";
		$('#msg-List').append(req);
	});

	//On Accept button press, Generate Accept event
	$('#btn-accept-req').on('click', function() {
		var d = $(this).parent().attr('data-id').split('-');
		socket.emit('Request-accepted', {senderName:d[0], receiverName:d[1]});
	});

	//On Reject button Press, Generate Reject event
	$('#btn-reject-req').on('click', function() {
		var d = $(this).parent().attr('data-id').split('-');
		socket.broadcast.to(d[0]).emit('Request-rejected', {senderName:d[0], receiverName:d[1]});
	});

	//Start Chat Event
	socket.on('Start-chat', function(data) {
		console.log('Starting Chat between ' + data.senderName + " and " + data.receiverName + "." );
		$('#div-chat-request').hide();
		$('#chat-head').text("Chats -" + userName + "-" + data.receiverName);
	});

	//Block Sender
	socket.on('Block-sender', function(data) {
		$('#div-chat-request').hide();
		var li = $('#ul-online-users li').each(function(){
			if(data.receiverName == li.text());
			li.css('color', 'red');
		});
	});


	//Create Chat Message event when user clicks Send.(Outgoing)
	$('#btn-send').on('click', function() {
		var msg = $('#msg-box').val();
		var str = $('#chat-head').text().split('-');
		if(msg != null && msg != "")
		{
			$('#msg-list').append("<li id='" + str[1] + "-" + str[2] + "' class='out-msg'> " + str[1] + " : " + msg + "</li>");
			socket.emit('Chat-msg', {senderName: str[1], receiverName: str[2], msg: msg});
		}
	});


	//incoming message
	socket.on('Chat-msg', function(data) {
		$('#msg-list').append("<li id='" + data.senderName + "-" + data.receiverName + "' class='in-msg'> " + data.senderName + " : " + data.msg + "</li>")
	});





	//Get Username from Url
	function getUserName() {
		var userName = location.search.split('?');
		userName = userName[1].split('=')[1];
		return userName;
	}

});//document ready