angular.module('collabaApp')
	.controller('RegisterController', RegisterController);



	function RegisterController() {
		var ctrl = this;
		console.log('Register Controller');

		ctrl.submit = submit;

		function submit() {
			console.log('Form Submit');
			console.log(ctrl.user.userName + ctrl.user.password);
		}
	}