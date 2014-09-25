/**
 * @ngdoc function
 * @name methodApp.controller:FooterCtrl
 * @description
 * # FooterCtrl
 * Controller of the methodApp
 */

angular.module('Volusion.controllers')
	.controller('FooterCtrl', ['$scope', 'translate', 'themeSettings', 'vnContentManager',
		function ($scope, translate, themeSettings, vnContentManager) {
			'use strict';

			$scope.$watch(
				function () {
					return vnContentManager.getFooterState();
				},
				function (state) {
					$scope.footerState = state;
				}, true);
		}]);
