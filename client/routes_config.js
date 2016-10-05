//Defining(Setting) angular collabaApp
angular.module('collabaApp', ['ngRoute', 'ngMaterial'])
	.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
	//$locationProvider.hashPrefix('!');

	$routeProvider
		.when('/', {
			templateUrl:'login/login_template.html',
			controller: 'LoginController',
			controllerAs: 'ctrl'
		})
		.when('/login', {
			templateUrl: 'login/login_template.html',
			controller: 'LoginController',
			controllerAs: 'ctrl'
		})
		.when('/register', {
			templateUrl:'register/register_template.html',
			controller: 'RegisterController',
			controllerAs: 'ctrl'
		})
		.when('/chat', {
			templateUrl: 'chat/chat_template.html',
			controller: 'ChatController',
			controllerAs: 'ctrl'
		})
		.otherwise('/login');
	}]);
