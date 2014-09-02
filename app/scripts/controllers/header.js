/**
 * @ngdoc function
 * @name methodApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the methodApp
 */

angular.module('Volusion.controllers')
	.controller('HeaderCtrl', ['$rootScope', '$scope', '$window', '$timeout', '$filter', 'translate', 'Cart', 'vnApi', 'ContentMgr', 'AppConfig',
		function ($rootScope, $scope, $window, $timeout, $filter, translate, Cart, vnApi, ContentMgr, AppConfig) {

			'use strict';

			// Watch the appheader state and update as needed
			$scope.$watch(
				function () {
					return ContentMgr.getHeaderState();
				},
				function (state) {
					$scope.headerState = state;
				},true);

			// Add translations
			translate.addParts('common');
			translate.addParts('header');

			$scope.getCartItemsCount = function () {
				return Cart.getCartItemsCount();
			};

			$scope.viewCart = function() {

				var host = AppConfig.getApiHost();

				if ($rootScope.isInDesktopMode) {
					return host + '/shoppingcart.asp';
				} else {
					return host + '/checkout.asp';
				}
			};
		}]);
