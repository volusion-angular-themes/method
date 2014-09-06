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
			$scope.choices = 99;
			$scope.showCoupon = false;

			translate.addParts('shopping-card');

			$scope.deleteItem = function (id) {
				$scope.cart.items = $filter('filter')($scope.cart.items, function (item) {
					return item.id !== id;
				});
			};

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

				$scope.currentSelectionText = choice;

				item.qty = choice;
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
				}
			);
			
		}]);
