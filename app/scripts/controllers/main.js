'use strict';

/**
 * @ngdoc function
 * @name Volusion.controllers.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the volusionMethodThemeApp
 */
angular.module('Volusion.controllers')
	.controller('MainCtrl', ['$scope', '$rootScope', '$location', '$window', '$timeout', 'vnApi', 'themeSettings', 'SiteConfig',
		function ($scope, $rootScope, $location, $window, $timeout, vnApi, themeSettings, SiteConfig) {

			// Handle the setup data
			SiteConfig.getConfig().then(function(response) {
				$scope.config = response;
			});

			themeSettings.getThemeSettings().then(function(response) {
				$scope.themeSettings = response;
			});

			vnApi.Nav().get({ navId: 1 }).$promise
				.then(function (response) {
					$scope.smartNavCategories = $scope.smartCategories = response.data;
				});

			// TODO: Consider moving SEO into a service
			$rootScope.seo = {};

		}]);
