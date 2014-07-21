'use strict';

/**
 * @ngdoc function
 * @name Volusion.controllers.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the volusionMethodThemeApp
 */
angular.module('Volusion.controllers')
	.controller('MainCtrl', ['$scope', '$rootScope', '$location', '$window', '$timeout', 'vnApi',
		function ($scope, $rootScope, $location, $window, $timeout, vnApi) {

			//hide header & footer when viewing theme-settings
//			if ($location.path().indexOf('/theme-settings') >= 0) {
//				$rootScope.hideWrapper = true;
//			}

			// TODO: Do we need this here?
			// Handle the setup data
			$scope.config = vnApi.Configuration().get();

			// TODO: Consider moving SEO into a service
			$rootScope.seo = {};

			// TODO: refactor the seo state into a directive.
			//$scope.$on('$stateChangeSuccess', function(event, toState) {
			//	if (toState.name === 'i18n') {
			//		$state.go('.home', null, { location: 'replace' });
			//	} else if (toState.name === 'i18n.home' && $scope.config) {
			//		$rootScope.seo = angular.extend($rootScope.seo, $scope.config.seo);
			//	}
			//});

		}]);
