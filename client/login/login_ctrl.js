angular.module('collabaApp')
	.controller('LoginController',['$window', 'LoginService', LoginController]);



	function LoginController($window, LoginService) {
		var ctrl = this;
		ctrl.error = "";
		console.log('Login Controller');

		ctrl.login = function (){
			console.log('Form Login');
			LoginService.loginUser(ctrl.user).success(function(data) {
				console.log('Login Service success');
				console.log(data);
				if(data.token != undefined)
					$window.localStorage.setItem('token', data.token);
				else 
					ctrl.error = "Invalid User Credentials.";
			});
			
		}
	}
