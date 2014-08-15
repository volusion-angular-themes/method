/**
 * @ngdoc function
 * @name methodApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the methodApp
 */

angular.module('Volusion.controllers')
	.controller('HeaderCtrl', ['$rootScope', '$scope', '$window', '$timeout', 'translate', 'Cart', 'vnApi', 'ContentMgr',
		function ($rootScope, $scope, $window, $timeout, translate, Cart, vnApi, ContentMgr) {

			'use strict';

			$rootScope.alert = null;

			$rootScope.closeAlert = function () {
				$rootScope.alert = null;
				$timeout.cancel($rootScope.alertTimer);
			};

			$rootScope.$on('vnNotification.show', function (evt, alert) {
				$rootScope.alert = alert;
				$rootScope.type = alert.type;

				if (alert.time === undefined) {
					alert.time = 4000;
				}

				$rootScope.alertTimer = $timeout(function () {
					$rootScope.closeAlert();
				}, alert.time);
			});

			// Watch the appheader state and update as needed
			$scope.$watch(
				function () {
					return ContentMgr.getHeaderState();
				},
				function (state) {
					$scope.headerState = state;
				},true);

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
		}]);
