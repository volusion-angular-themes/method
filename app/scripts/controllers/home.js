angular.module('Volusion.controllers')
	.controller('HomeCtrl', ['$scope', 'vnApi', 'themeSettings',
		function($scope, vnApi, themeSettings) {

			'use strict';

		$scope.themeSettings = themeSettings.getThemeSettings();

		// Featured Products
		vnApi.Product().get({ filter: 'featured', pageSize: 4 }).$promise
			.then(function(response) {
				$scope.featuredProducts = response.data;
			});
	}]);
