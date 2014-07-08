'use strict';

angular.module('Volusion.controllers')
	.controller('CategoryCtrl', [
		'$q', '$scope', '$rootScope', '$routeParams', 'vnApi', 'vnProductParams',
		function($q, $scope, $rootScope, $routeParams, vnApi, vnProductParams) {

			// Perhaps refactor this to updateProducts?
			function queryProducts() {
				var params = vnProductParams.getParamsObject();
				vnApi.Product().query(params).$promise.then(function(response) {
					$scope.products = response.data;
					$scope.facets = response.facets;
					$scope.categories = response.categories;
					$scope.subCategories = response.categories.subCategories;
				});
			}

			function getCategory(newSlug) {
				vnApi.Category().get({ slug: newSlug }).$promise.then(function(response) {
					// Handle the category data
					$scope.category = response.data;
					vnProductParams.addCategory(response.data.id);
					queryProducts();
				});
			}

			/**
			* The 'main' part of the controller lives below here.
			* - set up all the $scope properties
			* - declare scope level functionality (listeners etc)
			*/
			// TODO: refactor this into a service and use that service where it has access to the directive in the header.
			$rootScope.seo = {};
			$scope.currentCategory = {};

			$scope.clearAllFilters = function() {
				// Reset for the service layer (this will reset the stuff generated via directive
				vnProductParams.resetParamsObject();

				//Reset for the price fields
				$scope.minPrice = '';
				$scope.maxPrice = '';
				queryProducts();
			};

			$scope.searchByPrice = function(event) {

				// Detect the return/enter keypress only
				if( event.which === 13 ) {
					vnProductParams.setMinPrice($scope.minPrice);
					vnProductParams.setMaxPrice($scope.maxPrice);
					queryProducts();
				}
			};

			// Load the url category when the controller is activated.
			getCategory($routeParams.slug);

			// Listen for faceted search updates
			$rootScope.$on('ProductSearch.facetsUpdated', function() {
				queryProducts();
			});

			// Listen for Sub Category updated
			$rootScope.$on('ProductSearch.categoriesUpdated', function(evt, args) {
				vnProductParams.addCategory(args.categoryId);
				queryProducts();
			});

			// Clean up before this controller is destroyed
			$scope.$on('$destroy', function cleanUp() {
				$scope.clearAllFilters();
			});
		}
	]);
