angular.module('Volusion.controllers')
	.controller('HomeCtrl', ['$scope', 'vnApi',
		function($scope, vnApi) {

			'use strict';

			vnApi.Product().get({ filter: 'featured', pageSize: 4 }).$promise
				.then(function(response) {
					$scope.featuredProducts = response.data;
					console.log('featProds data: ', $scope.featuredProducts);
				});

//			//Todo: move this into a central service so logic tied to api contract only has to be updated in one place
//			// Currently search ctrl & categoryctrl implement this fn
			$scope.getDefaultImage = function (product) {
				var imgPath = '';
				if(product.imageCollections.length === 0) {
					imgPath = '/images/theme/tcp-no-image.jpg';
				} else {
					for(var i = product.imageCollections.length - 1; i >=0; i--) {
						var currentImageCollection = product.imageCollections[i];
						if('default' === currentImageCollection.key) {
							imgPath = 'http:' + currentImageCollection.images[0].medium;
							break;
						}
					}
				}
				return imgPath;
			};

		}
	]);
