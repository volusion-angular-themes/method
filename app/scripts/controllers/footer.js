/**
 * @ngdoc function
 * @name methodApp.controller:FooterCtrl
 * @description
 * # FooterCtrl
 * Controller of the methodApp
 */

angular.module('Volusion.controllers')
	.controller('FooterCtrl', ['$scope', 'vnContentManager',
		function ($scope, vnContentManager) {
			'use strict';

			//watch for changes
			$scope.$watch(
				function () {
					return vnContentManager.getFooterState();
				},
				function (state) {
					$scope.footerState = state;
				}, true);

			//watch for changes
			$scope.$watch(
				function () {
					return vnContentManager.getCheckoutFooterState();
				},
				function (state) {
					$scope.checkoutFooterState = state;
				}, true);

		}]);
