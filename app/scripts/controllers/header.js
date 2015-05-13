/**
 * @ngdoc function
 * @name methodApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the methodApp
 */

angular.module('Volusion.controllers')
	.controller('HeaderCtrl', ['$rootScope', '$scope', '$timeout', '$filter', 'translate', 'vnCart', 'vnContentManager', 'vnAppConfig', 'vnSearchManager',
		function ($rootScope, $scope, $timeout, $filter, translate, vnCart, vnContentManager, vnAppConfig, vnSearchManager) {

			'use strict';

            $scope.showSearchMobile = true;
            $scope.showSearchDesktop = false;
            $scope.searchLocal = vnSearchManager.getSearchText() || '';

			$scope.device = $rootScope.device;

            translate.addParts('common');
			translate.addParts('header');

			$scope.getCartItemsCount = function () {
				return vnCart.getCartItemsCount();
			};

			$scope.$watch(
				function () {
					return vnContentManager.getHeaderState();
				},
				function (state) {
					$scope.headerState = state;
				}, true);

			$scope.$watch(
				function () {
					return vnContentManager.getCheckoutHeaderState();
				},
				function (state) {
					$scope.checkoutHeaderState = state;
				}, true);

		}]);
