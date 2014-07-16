/**
 * @ngdoc function
 * @name methodApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the methodApp
 */

angular.module('Volusion.controllers')
	.controller('HeaderCtrl', ['$scope', 'translate', 'themeSettings',
		function ($scope, translate, themeSettings) {
			'use strict';

      $scope.themeSettings = themeSettings.getThemeSettings();

			translate.addParts('header');
		}]);
