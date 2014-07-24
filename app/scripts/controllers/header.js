/**
 * @ngdoc function
 * @name methodApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the methodApp
 */

angular.module('Volusion.controllers')
	.controller('HeaderCtrl', ['$rootScope', '$scope', '$window', '$timeout', 'translate', 'Cart', 'themeSettings', 'vnApi',
		function ($rootScope, $scope, $window, $timeout, translate, Cart, themeSettings, vnApi) {

			'use strict';

			$scope.themeSettings = themeSettings.getThemeSettings();

			// Add translation
			translate.addParts('header');

			$scope.getCartItemsCount = function () {
				return Cart.getCartItemsCount();
			};

			$scope.viewCart = function() {
				if ($rootScope.isInDesktopMode) {
					return '/shoppingcart.asp';
				} else {
					return '/checkout.asp';
				}
			};

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

			// Handle Navigation
			vnApi.Nav().get({ navId: 1 }).$promise
				.then(function (response) {
					$scope.smartNavCategories = $scope.smartCategories = response.data;

					$timeout(function () {
						buildSmartNav();
					}, 0);
				});
		}]);
