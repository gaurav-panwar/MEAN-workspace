
angular.module('myRoute', [])
	.config(['$routeProvider', myRoute]);

	function myRoute($http) {
		$routeProvider
			.when('/', {
				templateUrl: './myRoute.html',
				controller: 'myRouteController',
				controllerAs: 'vm'
			})
	}