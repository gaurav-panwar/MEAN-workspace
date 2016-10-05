angular.module('collabaApp')
	.service('LoginService', ['$http', '$location', LoginService]);

	function LoginService ($http, $location) {
	return {
		loginUser: function(user) {
			return $http.post('users/', user)
				.success(function(data) {
					console.log('Login Service success');
					console.log(data);
					if(data.token != undefined) {
						localStorage.setItem('token', data.token);
					}
					else
						ctrl.error = "Invalid User Credentials.";
				})
				.error(function(data) {
					$location.path('/login');//# not required here.
				});
			}
		}
	}
