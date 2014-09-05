/**
 * @ngdoc function
 * @name methodApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the methodApp
 */

angular.module('Volusion.controllers')
	.controller('HeaderCtrl', ['$rootScope', '$scope', '$timeout', '$filter', 'translate', 'vnCart', 'ContentMgr', 'AppConfig', 'searchManager', 'snapRemote',
		function ($rootScope, $scope, $timeout, $filter, translate, vnCart, ContentMgr, AppConfig, searchManager, snapRemote) {

			'use strict';

			$scope.alerts = [];

			translate.addParts('common');
			translate.addParts('header');

			$scope.closeAlert = function (id) {
				$scope.alerts = $filter('filter')($scope.alerts, function (alert) {
					return alert.id !== id;
				});
			};

			$scope.doSearch = function () {
				searchManager.updateSearch($scope.searchLocal);
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

			$scope.snapToggle = function (side) {
				if ($rootScope.isInDesktopMode) {
					snapRemote.toggle(side);
				} else {
					snapRemote.getSnapper().then(function(snapper) {
						if(side === snapper.state().state) {
							snapper.close();
						} else {
							snapper.expand(side);
						}
					});
				}
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
