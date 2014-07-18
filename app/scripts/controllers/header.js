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
			$scope.isPrimaryNavReady = false;

			function buildSmartNav(cssClassForTopLevelMenuItems) {
				var itemIndex = 0,
					firstItemTopPosition = 0,
					indexPositionWhereItemWrapped = 0,
					newSmartNavCategories = [];

				angular.forEach(angular.element('.' + cssClassForTopLevelMenuItems), function (value) {
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

				if (indexPositionWhereItemWrapped !== 0) {
					$scope.displaySmartNavMoreMenuItem = true;
					$scope.smartNavMoreCategories = [];

					angular.forEach($scope.smartCategories, function (value, index) {
						if (index >= (indexPositionWhereItemWrapped - 1)) {
							$scope.smartNavMoreCategories.push(value);
						} else {
							newSmartNavCategories.push(value);
						}
					});

					$scope.smartNavCategories = newSmartNavCategories;
				}

				angular.element('.' + cssClassForTopLevelMenuItems).css('visibility', 'visible');
			}

			$scope.windowWidth = $window.outerWidth;
			angular.element($window).bind('resize', function () {
				$scope.windowWidth = $window.outerWidth;
				$scope.$apply('windowWidth');
			});

			$scope.$watch('windowWidth', function () {
				$scope.displaySmartNavMoreMenuItem = false;
				angular.element('.nav-top-level-menu-items').css('visibility', 'hidden');

				$scope.smartNavCategories = $scope.smartCategories;

				$timeout(function () {
					buildSmartNav('nav-top-level-menu-items');
				}, 0);
			});
			// Smart Nav END *******************************************************

			// Handle Navigation
			vnApi.Nav().get({ navId: 1 }).$promise
				.then(function (response) {
					$scope.smartNavCategories = $scope.smartCategories = response.data;

					$timeout(function () {
						buildSmartNav('nav-top-level-menu-items');
					}, 0);

				}, function (error) {
					console.log('Error: ' + error);
				});


		}]);
