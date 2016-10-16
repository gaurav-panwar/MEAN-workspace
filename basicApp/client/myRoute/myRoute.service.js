angular.module('myRoute')
	.service('myRouteService', ['$http', myRouteService]);

	function myRouteService($http) {
		return {
			funServe: funServe
		}

		function funServe(data) {
			return $http.post('/reg', data)//difference between success and then?
				.success(function(data) {
					console.log('myRoute Service Success : ' + data);
				})
				.error(function(err) {
					console.error(err);
				});
		}

	}
