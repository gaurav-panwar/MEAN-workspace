myRoute.service('myRouteService', ['$http', '$location', myRouteService]);

	function myRouteService($http, $location) {
		return {
			funServe: function (data) {
				return $http.post('/', data)//difference between success and then
					.success(function(data) {
						console.log('myRoute Service Success : ' + data);
					})
					.error(function(err) {
						console.error(err);
					});
			}
		}
	}
