/**
 * @ngdoc function
 * @name methodApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the methodApp
 */

angular.module('Volusion.controllers')
	.controller('ShoppingCartCtrl', ['$rootScope', '$scope', '$timeout', '$filter', '$window', 'translate', 'vnCart', 'ContentMgr', 'vnAppConfig', 'vnAppMessageService', 'notifications',
		function ($rootScope, $scope, $timeout, $filter, $window, translate, vnCart, ContentMgr, vnAppConfig, vnAppMessageService, notifications) {

			'use strict';

			$scope.cart = {};
			$scope.cartEmpty = true;
			$scope.calcSubtotal = 0;
			$scope.choices = 99;
			$scope.coupon = {
				'code' : '',
				'show' : false
			};
			$scope.couponsEmpty = false;

			translate.addParts('shopping-card');

			function updateCart() {
				vnCart.updateCart()
					.then(function () {
						$scope.cart = vnCart.getCart();

						if ($scope.cart.serviceErrors.length === 0) {
							notifications.displaySuccessfulUpdate();
							notifications.displayWarnings($scope.cart.warnings); // if any
						} else {
							notifications.displayErrors($scope.cart.serviceErrors);
						}
					});
			}

			$scope.applyCoupon = function () {
				$scope.cart.discounts = $filter('filter')($scope.cart.discounts, function (coupon) {
					return coupon.couponCode !== $scope.coupon.code;
				});

				$scope.cart.discounts.push({ 'couponCode': $scope.coupon.code });

				updateCart();
			};

			$scope.deleteCoupon = function (id) {
				$scope.cart.discounts = $filter('filter')($scope.cart.discounts, function (coupon) {
					return coupon.id !== id;
				});

				$scope.couponsEmpty = ($scope.cart.discounts.length > 0) ? false : true;

				updateCart();
			};

			$scope.deleteItem = function (id) {
				$scope.cart.items = $filter('filter')($scope.cart.items, function (item) {
					return item.id !== id;
				});

				updateCart();
			};

			$scope.getArray = function(num) {
				return new Array(num);
			};

			$scope.getCartItemsCount = function () {
				return vnCart.getCartItemsCount();
			};

			$scope.gotoCheckout = function() {

				var host = vnAppConfig.getApiHost();

				if ($rootScope.isInDesktopMode) {
					$window.location.assign(host + '/one-page-checkout.asp');
				} else {
					$window.location.assign(host + '/checkout.asp#shipping');
				}
			};

			$scope.onOptionChanged = function (item, choice) {

				item.qty = choice;

				updateCart();
			};

			$scope.toggleShowCoupon = function () {
				$scope.coupon.show = !$scope.coupon.show;
			};

			$scope.$watch(
				function () {
					return vnCart.getCart();
				},
				function () {
					$scope.cart = vnCart.getCart();

					if ($scope.cart.totals !== undefined) {
						// "$scope.cart.totals.discounts" format is "-amount" ... hence the addition
						$scope.calcSubtotal = $scope.cart.totals.items + $scope.cart.totals.discounts;

						$scope.cartEmpty = ($scope.cart.totals.qty > 0) ? false : true;
					}

					if ($scope.cart.discounts !== undefined) {
						$scope.couponsEmpty = ($scope.cart.discounts.length > 0) ? false : true;
					}
				}
			);
		}]);
