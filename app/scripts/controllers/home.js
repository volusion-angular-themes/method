angular.module('Volusion.controllers')
	.controller('HomeCtrl', ['$scope', 'vnApi', 'themeSettings',
		function($scope, vnApi, themeSettings) {

			'use strict';


			$scope.getFeaturedProducts = function () {
				// Featured Products
				vnApi.Product().get({ filter: 'featured', pageSize: 4 }).$promise
					.then(function(response) {
						$scope.featuredProducts = response.data;
						console.log('featured prods: ', $scope.featuredProducts);
					});
			};
//		$scope.themeSettings = themeSettings.getThemeSettings();
			themeSettings.getThemeSettings()
				.then(function(settings) {
					$scope.themeSettings = settings;
					console.log('thm settings: ', $scope.themeSettings);
					$scope.getFeaturedProducts();
				});


//		// Featured Products
//		vnApi.Product().get({ filter: 'featured', pageSize: 4 }).$promise
//			.then(function(response) {
//				$scope.featuredProducts = response.data;
//				console.log('featured prods: ', $scope.featuredProducts);
//			});
	}]);
