angular.module('myApp')
	.controller('myAppController', ['myAppService', myAppController]);


	function myAppController(myAppService) {
		var vm = this;
		vm.submitForm = submitForm;

		console.log('Working');
	
		function submitForm() {
			console.log("Inside Submit Form : "  + vm.data);
			myAppService.funServe(vm.data);
		}
	}

	