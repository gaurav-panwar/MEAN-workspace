angular.module('collabaApp')
	.controller('ChatController', ['AuthService', ChatController]);

	function ChatController(AuthService) {
		AuthService.authUser();
	}