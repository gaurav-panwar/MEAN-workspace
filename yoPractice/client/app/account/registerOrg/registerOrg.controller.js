'use strict';

import angular from 'angular';
import routes from './registerOrg.routes';
import service from './registerOrg.service';


export default angular.module('yoPracticeApp.registerOrg', [])
	.config(routes)
	.service('RegisterOrgService', service)
	.controller('RegisterOrgController', ['RegisterOrgService', RegisterOrgController])
	.name;


export function RegisterOrgController(RegisterOrgService) {
	'ngInject';

	var vm = this;

	console.log('Inside RegisterOrgController');
	
	vm.registerOrg = registerOrg;
	/*vm.error.passwordMatch = false; Error Checking can be done later.*/

	function registerOrg() {
		console.log(vm.org);
		RegisterOrgService.register(vm.org);
	}
}
