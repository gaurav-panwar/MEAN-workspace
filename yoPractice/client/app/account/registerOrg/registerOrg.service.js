'use strict';

import angular from 'angular';




export function RegisterOrgService($http) {
	'ngInject';

	return {
		register: register
	}

	function register(org) {
		console.log('Organization data in Service : ' + org);
		/*$http.post('/registerOrg', org)
			.then( function(res) {
				console.log(res.data);
			})
			.catch(function(err) {
				console.error(err);
			});*/
	}
}