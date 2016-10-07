'use strict';

var myRoute = angular.module('myRoute', [])
	.controller('myRouteController', ['myRouteService', myRouteController]);

	function myRouteController(myRouteService) {
		var vm = this;
		console.log('My Route Controller');
		console.log('My data : ' + vm.data);
		vm.submitForm = submitForm;

		function submitForm(vm.data) {
			myRouteService.funServe(vm.data);
		}
		
	}