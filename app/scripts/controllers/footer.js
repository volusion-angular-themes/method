/**
 * @ngdoc function
 * @name methodApp.controller:FooterCtrl
 * @description
 * # FooterCtrl
 * Controller of the methodApp
 */

angular.module('Volusion.controllers')
  .controller('FooterCtrl', ['$scope', 'translate', 'themeSettings',
		function ($scope, translate, themeSettings) {
			'use strict';

      $scope.themeSettings = themeSettings.getThemeSettings();

			translate.addParts('footer');
		}]);
