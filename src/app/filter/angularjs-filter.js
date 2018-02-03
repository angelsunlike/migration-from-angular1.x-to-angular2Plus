(function() {
	'use strict';

	angular
		.module('ccfeFrontend')
		.filter('angularjsFilter', angularjsFilter);

	function angularjsFilter() {
		return function(value){
			return value === 'angular' ? 'angularjs filter' : value;
		}
	}
})();
