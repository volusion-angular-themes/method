/**
 * @ngdoc function
 * @name methodApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the methodApp
 */

angular.module('Volusion.controllers')
	.controller('HeaderCtrl', ['$scope', 'translate', 'Cart', 'themeSettings',
		function ($scope, translate, Cart, themeSettings) {

			'use strict';

			$scope.themeSettings = themeSettings.getThemeSettings();

			translate.addParts('header');

			$scope.getCartItemsCount = function () {
				return Cart.getCartItemsCount();
			};

		}]);
