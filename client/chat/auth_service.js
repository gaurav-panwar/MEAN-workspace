angular.module('collabaApp')
	.service('AuthService', ['$http', '$window', AuthService]);

	function AuthService($http, $window) {
		return {
			authUser: function() {
				var token = localStorage.getItem('token');
				var header = {'Authorization': token};
				return $http.post('/chat', null, {headers: header})
					.success(function(data) {
						console.log('Authorization Success');		
					})
					.error(function(data) {
					$window.location.href = '#/login';
				});
			}
		}
	}