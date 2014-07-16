'use strict';

angular.module('Volusion.controllers')
	.controller('HomeCtrl', function(
		$scope,
		vnApi,
		themeSettings) {

			console.log('vnApi in home', vnApi);

			$scope.themeSettings = themeSettings.getThemeSettings();

			// Featured Products
			vnApi.Product().get({ filter: 'featured', pageSize: 4 }).$promise
				.then(function(response) {
					$scope.featuredProducts = response.data;
				});
		}
	);
