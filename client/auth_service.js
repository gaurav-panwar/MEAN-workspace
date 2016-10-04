angular.module('collabaApp')
	.service('AuthService', ['$http', '$window', AuthService]);

	function AuthService($http, $window) {
		var user_token = $window.localStorage.getItem('token');
		if(token != null) {
			console.log(token);
		}
	}