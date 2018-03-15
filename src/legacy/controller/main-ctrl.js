(function() {
    'use strict';

    angular.module('ccfeFrontend')
        .controller('MainCtrl', MainCtrl);
	/* @ngInject */
	function MainCtrl(AngularjsService, AngularService, ToastsManager) {
		var vm = this;
		vm.message = 'This is an angularjs controller';
		vm.angular5 = 'This is an angular component';
		vm.angular1 = 'This is an angularjs component';
		vm.clickEvent1 = function () {
			AngularjsService.popup();
		};

		vm.clickEvent2 = function () {
			AngularService.popup();
		};

		vm.clickToastr = function () {
			ToastsManager.error('angular toastr service');
		};
	}
})();
