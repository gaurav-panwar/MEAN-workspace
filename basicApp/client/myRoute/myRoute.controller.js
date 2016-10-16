'use strict';

	angular.module('myRoute')
		.controller('myRouteController', ['myRouteService', myRouteController]);

	function myRouteController(myRouteService) {
		var vm = this;

		vm.submitForm = submitForm;

		function submitForm() {
			console.log(vm.data);
			myRouteService.funServe(vm.data);
		}

	}
