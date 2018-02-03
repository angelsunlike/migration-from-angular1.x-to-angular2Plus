(function() {
	'use strict';

	angular
		.module('ccfeFrontend')
		.component('helloAngular', {
			templateUrl: './src/app/components/hello-angular/hello-angular.html',
			controller: helloAngularCtrl,
			controllerAs: 'vm',
			bindings: {
				hero: '='
			}
		});
	//helloAngularCtrl.$inject = ['AngularjsService', 'AngularService']; ng-annotate-loader ª·∞Ô√¶≤Â»Î’‚æ‰
	/* @ngInject */
	function helloAngularCtrl(AngularjsService, AngularService) {
		var vm = this;
		vm.clickEvent1 = function () {
			AngularjsService.popup();
		};
		vm.clickEvent2 = function () {
			AngularService.popup();
		};
	}
})();