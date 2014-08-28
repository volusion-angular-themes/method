angular.module('Volusion.controllers')
	.controller('HomeCtrl', ['$scope', '$filter', 'vnApi', 'vnImagePreloader',
		function($scope, $filter, vnApi, vnImagePreloader) {

			'use strict';

			var imagesToPreload  = [];

			angular.forEach($scope.themeSettings.pages.home.slider.slides, function (slide) {
				imagesToPreload.push(slide.imageUrl);
			});

			vnImagePreloader.preloadImages(imagesToPreload);

			vnApi.Product().get({ filter: 'featured', pageSize: 4 }).$promise
				.then(function(response) {
					$scope.featuredProducts = response.data;
				});

			$scope.getImagePath = function (imageCollections) {
				// This gets the default:medium image for the product
				var path = $filter('vnProductImageFilter')(imageCollections);

				if ('' === path) {
					return '/images/theme/tcp-no-image.jpg';
				}

				return path;
			};



		}
	]);
