angular.module('collabaApp')
	.service('LoginService', ['$http', RegisterService]);

	function RegisterService ($http) { 
	return {
		loginUser: function(user) {
			return $http.post('users/', user);
			}
		}
	}