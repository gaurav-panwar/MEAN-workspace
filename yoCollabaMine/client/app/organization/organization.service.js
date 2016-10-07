'use strict';

const angular = require('angular');
const uiRouter = require('angular-ui-router');

export function OrgService($http, $location) {
	'ngInject';

	return {
		createOrg: function(org) {
			return $http.post('organizations/', org)
				.success(function(data) {
					console.log('Organization Service Success.');
					console.log(data);
				})
				.error(function(err) {
					console.error(err);
					$location.path('/organization');
				});
		}
	}
}