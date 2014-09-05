'use strict';

/**
 * @ngdoc function
 * @name Volusion.controllers.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the methodApp
 */
angular.module('Volusion.controllers')
	.controller('MainCtrl', ['$scope', '$rootScope', '$location', '$window', '$timeout', 'vnApi', 'themeSettings', 'SiteConfig', 'vnImagePreloader',
		function ($scope, $rootScope, $location, $window, $timeout, vnApi, themeSettings, SiteConfig, vnImagePreloader) {

			// Handle the setup data
			SiteConfig.getConfig().then(function(response) {
				$scope.config = response.data;
			});

			themeSettings.getThemeSettings().then(function(response) {
				$scope.themeSettings = response;

				var imagesToPreload  = [];

				angular.forEach($scope.themeSettings.pages.home.slider.slides, function (slide) {
					imagesToPreload.push(slide.imageUrl);
				});

				vnImagePreloader.preloadImages(imagesToPreload);
			});

			// Smart Nav  *********************************************************

			var threshold = {
				windowWidth : -1,
				position: 0
			};

			function buildSmartNav() {

				var itemIndex = 0,
					firstItemTopPosition = 0,
					indexPositionWhereItemWrapped = 0,
					newSmartNavCategories = [];

				// Reset threshold
				if (threshold.windowWidth !== -1 && $scope.windowWidth > threshold.windowWidth) {
					indexPositionWhereItemWrapped = 0;
					threshold.windowWidth = -1;
					threshold.position = 0;
				}

				if (threshold.windowWidth === -1) {
					angular.forEach(angular.element('.nav-top-level-menu-items'), function (value) {
						// Get top position of first item
						if (itemIndex === 0) {
							firstItemTopPosition = angular.element(value).position().top;
						}

						if (angular.element(value).position().top !== firstItemTopPosition) {
							indexPositionWhereItemWrapped = itemIndex;
							return false;
						}

						itemIndex++;
					});
				}

				if (indexPositionWhereItemWrapped !== 0 || threshold.windowWidth !== -1) {
					// Initialize threshold
					if (threshold.windowWidth === -1) {
						threshold.windowWidth = $scope.windowWidth;
						threshold.position = indexPositionWhereItemWrapped;
					} else {
						indexPositionWhereItemWrapped = threshold.position;
					}

					$scope.smartNavMoreCategories = [];

					angular.forEach($scope.smartCategories, function (value, index) {
						if (index >= (indexPositionWhereItemWrapped - 1)) {
							$scope.smartNavMoreCategories.push(value);
						} else {
							newSmartNavCategories.push(value);
						}
					});

					$scope.smartNavCategories = newSmartNavCategories;
				} else {
					$scope.smartNavCategories = $scope.smartCategories;
				}

				$scope.displaySmartNavMoreMenuItem = (indexPositionWhereItemWrapped !== 0);
			}

			$scope.initializeWindowSize = function() {
				$scope.windowWidth = $window.outerWidth;
			};
			$scope.initializeWindowSize();

			angular.element($window).bind('resize', function () {
				$scope.initializeWindowSize();
				$scope.$apply();

				buildSmartNav();
			});

			// Smart Nav END *******************************************************


			vnApi.Nav().get({ navId: 1 }).$promise
				.then(function (response) {
					$scope.smartNavCategories = $scope.smartCategories = response.data;
					// Handle Navigation
					$timeout(function () {
						buildSmartNav();
					}, 0);
				});

			// TODO: Consider moving SEO into a service
			$rootScope.seo = {};

		}]);
