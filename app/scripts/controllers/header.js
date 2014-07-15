/**
 * @ngdoc function
 * @name volusionMethodThemeApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the volusionMethodThemeApp
 */

angular.module('Volusion.controllers')
	.controller('HeaderCtrl', ['$scope', 'translate',
		function ($scope, translate) {
			'use strict';

			translate.addParts('header');
		}]);
