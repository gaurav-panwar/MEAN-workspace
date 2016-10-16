angular.module('myApp')
	.service('myAppService', ['$http', myAppService]);

	function myAppService($http) {
		return {
			funServe: funServe
		}

		function funServe(data) {
			return $http.post('/submit', data)
				.then(function(res) {//response is got here.
					console.log(res.data);
				});
		}
	}