'use strict';

export default function routes($stateProvider) {
	'ngInject';//ask it's use

	$stateProvider.state('myRoute', {
		url:'/myRoute',
		templateUrl:'./myRoute.html',
		controller: myRouteController,
		controllerAs: vm
	});
}