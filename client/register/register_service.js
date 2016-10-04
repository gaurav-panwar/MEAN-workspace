angular.module('collabaApp')
	.service('RegisterService', ['$http', RegisterService]);

	function RegisterService($http) {
		return {
			registerUser: function(user) {
				return $http.post('users/register/', user);
			}
		}
	}