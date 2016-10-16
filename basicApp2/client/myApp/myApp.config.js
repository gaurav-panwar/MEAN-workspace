angular.module('myApp', ['ngRoute'])
	.config(['$routeProvider', routeConfig]);

	function routeConfig($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: './myApp/myApp.html',
				controller: 'myAppController',
				controllerAs: 'vm'
			})
			.otherwise('/');
	}