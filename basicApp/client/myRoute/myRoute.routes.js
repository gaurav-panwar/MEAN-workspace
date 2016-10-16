
angular.module('myRoute', ['ngRoute'])
	.config(['$routeProvider', routeConfig]);

	function routeConfig($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: './myRoute/myRoute.html',
				controller: 'myRouteController',
				controllerAs: 'vm'
			})
	}
