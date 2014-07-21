/**
 * @ngdoc function
 * @name methodApp.controller:FooterCtrl
 * @description
 * # FooterCtrl
 * Controller of the methodApp
 */

angular.module('Volusion.controllers')
	.controller('FooterCtrl', ['$scope', 'translate', 'themeSettings', 'ContentMgr',
		function ($scope, translate, themeSettings, ContentMgr) {
			'use strict';

			$scope.themeSettings = themeSettings.getThemeSettings();

			translate.addParts('footer');


			// Watch the footer state and update as needed
			$scope.$watch(
				function () {
					return ContentMgr.getFooterState();
				},
				function (state) {
					$scope.footerState = state;
			},true);

//			$scope.hideContent = function() {
//				$scope.showFooter = false;
//			};
//
//			$scope.showContent = function() {
//				$scope.showFooter = true;
//			};

		}]);
