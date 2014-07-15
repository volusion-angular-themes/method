/**
 * @ngdoc function
 * @name methodApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the methodApp
 */

angular.module('Volusion.controllers')
	.controller('HeaderCtrl', ['$scope', 'translate',
		function ($scope, translate) {
			'use strict';

			translate.addParts('header');
		}]);
