'use strict';


export default function routes($stateProvider) {
	'ngInject';
	
	$stateProvider
		.state('registerOrg', {
			url: '/registerOrg',
			template: require('./registerOrg.html'),
			controller: 'RegisterOrgController',
			controllerAs: 'vm'
		});
}