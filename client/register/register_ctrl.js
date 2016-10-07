angular.module('collabaApp')
	.controller('RegisterController', RegisterController);



	function RegisterController($window, RegisterService) {
		var ctrl = this;
		console.log('Register Controller');
		ctrl.error = "";

		ctrl.register = register;

		function register() {
			var success = false;
			console.log('Form Submit');
			console.log(ctrl.user);
			if(validateUser(ctrl.user)) {
				RegisterService.registerUser(ctrl.user).success(function(data) {
					console.log(data);
					if(data == true)
					{
						success = true;
						$window.location.href = '#/';
					}	
				});
			}
			else 
				ctrl.error = 'The Passwords must match.';
			$window.location.href = '#/register';
		}
	}


	function validateUser(user) {
		if(user.password == user.confPass)
			return true;
		return false;
	}