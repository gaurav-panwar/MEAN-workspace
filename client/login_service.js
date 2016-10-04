angular.module('collabaApp')
	.service('LoginService', ['$http', '$location', LoginService]);


function LoginService($http, $location, user) { 
		$http.post('users/', user)
		.then(function success(data, status, config) {
			console.log('Inside Login Service');
			var j = JSON.stringify(data);
			var token = JSON.parse(j);
			console.log('Login Success ' + token);
			//$location.path('#/chat/user.userName');

		},
		function failure (err, data, status, config) {
			console.log('Login failure');
			$location.path('#/login');
		} 
	);
}