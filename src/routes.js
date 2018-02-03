(function() {
    'use strict';

    angular
        .module('ccfeFrontend')
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
			$locationProvider.html5Mode(true).hashPrefix('!');
            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('main', {
                    url: '/',
                    controller: 'MainCtrl',
                    controllerAs: 'vm',
                    templateUrl: './src/controllers/main/main-ctrl.html'
                })
				.state('test', {
					url: '/test',
					template: '<test-content></test-content>'
				});
        }]);
})();