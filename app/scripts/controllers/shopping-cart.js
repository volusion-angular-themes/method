/**
 * @ngdoc function
 * @name methodApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the methodApp
 */

angular.module('Volusion.controllers')
	.controller('ShoppingCardCtrl', ['$rootScope', '$scope', '$timeout', '$filter', '$window', 'translate', 'vnCart', 'ContentMgr', 'AppConfig',
		function ($rootScope, $scope, $timeout, $filter, $window, translate, vnCart, ContentMgr, AppConfig) {

			'use strict';

			$scope.cart = {};

			$scope.$watch(
				function () {
					return vnCart.getCart();
				},
				function () {
					$scope.cart = vnCart.getCart();
				}
			);



			$scope.getCartItemsCount = function () {
				return vnCart.getCartItemsCount();
			};

			$scope.showCoupon = false;

			$scope.toggleShowCoupon = function () {
				$scope.showCoupon = !$scope.showCoupon;
			};

			$scope.gotoCheckout = function() {

				var host = AppConfig.getApiHost();

				if ($rootScope.isInDesktopMode) {
					$window.location.assign(host + '/one-page-checkout.asp');
				} else {
					$window.location.assign(host + '/checkout.asp#shipping');
				}
			};

		}]);
