/**
 * @ngdoc function
 * @name methodApp.controller:FooterCtrl
 * @description
 * # FooterCtrl
 * Controller of the methodApp
 */

angular.module('Volusion.controllers')
  .controller('FooterCtrl', ['$scope', 'translate',
		function ($scope, translate) {
			'use strict';

			translate.addParts('footer');
		}]);
