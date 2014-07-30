angular.module('Volusion.controllers')
	.controller('HomeCtrl', ['$scope', 'vnApi', 'themeSettings',
		function($scope, vnApi, themeSettings) {

			'use strict';


			$scope.getFeaturedProducts = function () {
				// Featured Products
				vnApi.Product().get({ filter: 'featured', pageSize: 4 }).$promise
					.then(function(response) {
						$scope.featuredProducts = response.data;
					});
			};

			themeSettings.getThemeSettings()
				.then(function(settings) {
					$scope.themeSettings = settings;
					$scope.getFeaturedProducts();
				});
	}]);
