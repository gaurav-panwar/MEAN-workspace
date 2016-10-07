angular.module('collabaApp')
	.controller('LoginController',['LoginService', LoginController]);



	function LoginController(LoginService) {
		var ctrl = this;
		ctrl.error = "";
		console.log('Login Controller');

		ctrl.login = function (){
			console.log('Form Login');
			LoginService.loginUser(ctrl.user);
		}
	}
