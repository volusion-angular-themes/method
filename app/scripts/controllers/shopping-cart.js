/**
 * @ngdoc function
 * @name methodApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the methodApp
 */

angular.module('Volusion.controllers')
	.controller('ShoppingCardCtrl', ['$rootScope', '$scope', '$timeout', '$filter', '$window', 'translate', 'vnCart', 'ContentMgr', 'AppConfig', 'vnAppMessageService',
		function ($rootScope, $scope, $timeout, $filter, $window, translate, vnCart, ContentMgr, AppConfig, vnAppMessageService) {

			'use strict';

			$scope.cart = {};
			$scope.calcSubtotal = 0;
			$scope.choices = 99;
			$scope.showCoupon = false;

			translate.addParts('shopping-card');

			$scope.applyCoupon = function () {
				$scope.cart.discounts = $filter('filter')($scope.cart.discounts, function (coupon) {
					return coupon.couponCode !== $scope.coupon;
				});

				$scope.cart.discounts.push({ 'couponCode': $scope.coupon });

				vnCart.updateCart()
					.then(function (cart) {
						$scope.cart = cart;

						if ($scope.cart.serviceErrors.length === 0) {
							displaySuccess();
							displayWarnings($scope.cart.warnings); // if any
						} else {
							displayErrors($scope.cart.serviceErrors);
						}
					});
			};

			$scope.deleteItem = function (id) {
				$scope.cart.items = $filter('filter')($scope.cart.items, function (item) {
					return item.id !== id;
				});

				vnCart.updateCart()
					.then(function (cart) {
						$scope.cart = cart;

						if ($scope.cart.serviceErrors.length === 0) {
							displaySuccess();
							displayWarnings($scope.cart.warnings); // if any
						} else {
							displayErrors($scope.cart.serviceErrors);
						}
					});
			};

			function displayErrors(errors) {
				var vnMsg,
					messageKey,
					translateFilter = $filter('translate');

				if (errors && errors.length > 0) {
					angular.forEach(errors, function (error) {
						messageKey = 'message.' + error.Code;
						vnMsg = translateFilter(messageKey);
						vnMsg = (!vnMsg || vnMsg === messageKey) ? error.Message : vnMsg;
						vnMsg = vnMsg || translateFilter('message.CART_UNKNOWN');
						vnAppMessageService.addMessage({ type: 'danger', text: vnMsg });
					});
				}
			}

			function displaySuccess() {
				var vnMsg = $filter('translate')('message.CART_UPDATE_SUCCESS');
				vnAppMessageService.addMessage({ type: 'success', text: vnMsg });
			}

			function displayWarnings(warningsArray) {
				var vnMsg, messageKey;
				var translateFilter = $filter('translate');

				if (warningsArray && warningsArray.length > 0) {
					angular.forEach(warningsArray, function (warning) {
						messageKey = 'message.' + warning.Code;
						vnMsg = translateFilter(messageKey);
						vnMsg = (!vnMsg || vnMsg === messageKey) ? warning.Message : vnMsg;
						vnAppMessageService.addMessage({ type: 'warning', text: vnMsg });
					});
				}
			}

			$scope.getArray = function(num) {
				return new Array(num);
			};

			$scope.getCartItemsCount = function () {
				return vnCart.getCartItemsCount();
			};

			$scope.gotoCheckout = function() {

				var host = AppConfig.getApiHost();

				if ($rootScope.isInDesktopMode) {
					$window.location.assign(host + '/one-page-checkout.asp');
				} else {
					$window.location.assign(host + '/checkout.asp#shipping');
				}
			};

			$scope.onOptionChanged = function (item, choice) {

				item.qty = choice;

				vnCart.updateCart()
					.then(function (cart) {
						$scope.cart = cart;

						if ($scope.cart.serviceErrors.length === 0) {
							displaySuccess();
							displayWarnings($scope.cart.warnings); // if any
						} else {
							displayErrors($scope.cart.serviceErrors);
						}
					});
			};

			$scope.toggleShowCoupon = function () {
				$scope.showCoupon = !$scope.showCoupon;
			};

			$scope.$watch(
				function () {
					return vnCart.getCart();
				},
				function () {
					$scope.cart = vnCart.getCart();

					// "$scope.cart.totals.discounts" format is "-amount" ... hence the addition
					$scope.calcSubtotal = $scope.cart.totals.items + $scope.cart.totals.discounts;
				}
			);
		}]);
