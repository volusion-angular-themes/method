/**
 * @ngdoc function
 * @name methodApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the methodApp
 */

angular.module('Volusion.controllers')
	.controller('HeaderCtrl', ['$rootScope', '$scope', '$timeout', '$filter', 'translate', 'vnCart', 'ContentMgr', 'vnAppConfig', 'vnSearchManager', 'snapRemote',
		function ($rootScope, $scope, $timeout, $filter, translate, vnCart, ContentMgr, vnAppConfig, vnSearchManager, snapRemote) {

			'use strict';

            $scope.showSearchMobile = true;
            $scope.showSearchDesktop = false;
            $scope.searchLocal = vnSearchManager.getSearchText() || '';

            translate.addParts('common');
			translate.addParts('header');

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

			$scope.$watch(
				function () {
					return ContentMgr.getHeaderState();
				},
				function (state) {
					$scope.headerState = state;
				}, true);


		}]);
