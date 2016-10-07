//Defining(Setting) angular collabaApp
angular.module('collabaApp', ['ngRoute', 'ngMaterial'])
	.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
	//$locationProvider.hashPrefix('!');

	$routeProvider
		.when('/', {
			templateUrl:'login/login.html',
			controller: 'LoginController',
			controllerAs: 'ctrl'
		})
		.when('/login', {
			templateUrl: 'login/login.html',
			controller: 'LoginController',
			controllerAs: 'ctrl'
		})
		.when('/register', {
			templateUrl:'register/register.html',
			controller: 'RegisterController',
			controllerAs: 'ctrl'
		})
		.when('/chat', {
			templateUrl: 'chat/chat.html',
			controller: 'ChatController',
			controllerAs: 'ctrl'
		})
		.otherwise('/');
	}]);
