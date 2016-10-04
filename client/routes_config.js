//Defining(Setting) angular collabaApp
angular.module('collabaApp', ['ngRoute'])
	.config(['$locationProvider', '$routeProvider', configFunc]);//define dependencies


function configFunc($locationProvider, $routeProvider) {
	//$locationProvider.hashPrefix('!');

	$routeProvider
		.when('/', {
			templateUrl:'login_template.html',
			controller: 'LoginController',
			controllerAs: 'ctrl'
		})
		.when('/login', {
			templateUrl: 'login_template.html',
			controller: 'LoginController',
			controllerAs: 'ctrl'
		})
		.when('/register', {
			templateUrl:'register_template.html',
			controller: 'RegisterController',
			controllerAs: 'ctrl'
		})
		/*.when('/chat/:userName', {
			templateUrl:''
		})*/
		.otherwise('/login');
}