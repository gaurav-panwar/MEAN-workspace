angular.module('collabaApp')
	.controller('LoginController',['LoginService', LoginController]);



	function LoginController(LoginService) {
		var ctrl = this;
		console.log('Login Controller');

		ctrl.submit = function (){
			console.log('Form Submit');
			console.log(ctrl.user);
			LoginService(ctrl.user);
			console.log('UserName : ' + ctrl.user.userName + ", Password : " + ctrl.user.password);
		}
	}