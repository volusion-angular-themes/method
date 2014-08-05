angular.module('Volusion.controllers')
	.controller('HomeCtrl', ['$scope', '$filter', 'vnApi',
		function($scope, $filter, vnApi) {

			'use strict';

			vnApi.Product().get({ filter: 'featured', pageSize: 4 }).$promise
				.then(function(response) {
					$scope.featuredProducts = response.data;
				});

			$scope.getImagePath = function (imageCollections) {
				// Get the default:medium sized image for this collection
				// See docs for vnProductImageFilter fro more options
				return $filter('vnProductImageFilter')(imageCollections);
			};

		}
	]);
