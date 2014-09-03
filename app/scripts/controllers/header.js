/**
 * @ngdoc function
 * @name methodApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the methodApp
 */

angular.module('Volusion.controllers')
	.controller('HeaderCtrl', ['$rootScope', '$scope', '$timeout', '$filter', 'translate', 'vnCart', 'ContentMgr', 'AppConfig',
		function ($rootScope, $scope, $timeout, $filter, translate, vnCart, ContentMgr, AppConfig) {

			'use strict';

			$scope.alerts = [];

			translate.addParts('common');
			translate.addParts('header');

			$scope.closeAlert = function (id) {
				$scope.alerts = $filter('filter')($scope.alerts, function (alert) {
					return alert.id !== id;
				});
			};

			$rootScope.$on('vnNotification.show', function (evt, alert) {
				if (alert.time === undefined) {
					alert.time = 4000;
				}

				alert.id = Date.now();

				alert.alertTimer = $timeout(function () {
					$scope.closeAlert(alert.id);
				}, alert.time);

				$scope.alerts.push(alert);
			});

			$scope.getCartItemsCount = function () {
				return vnCart.getCartItemsCount();
			};

			$scope.viewCart = function() {

				var host = AppConfig.getApiHost();

				if ($rootScope.isInDesktopMode) {
					return host + '/shoppingcart.asp';
				} else {
					return host + '/checkout.asp';
				}
			};

			$scope.$watch(
				function () {
					return ContentMgr.getHeaderState();
				},
				function (state) {
					$scope.headerState = state;
				}, true);
		}]);
