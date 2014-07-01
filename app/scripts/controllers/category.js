'use strict';

angular.module('Volusion.controllers')
	.controller('CategoryCtrl', [
		'$q', '$scope', '$rootScope', '$routeParams', 'vnApi', 'vnProductParams',
		function($q, $scope, $rootScope, $routeParams, vnApi, vnProductParams) {

			// Perhaps refactor this to updateProducts?
			function queryProducts() {

				var params = vnProductParams.getParamsObject();
				vnApi.Product().query(params).$promise.then(function(response) {
					console.log('product response.data', response);
					$scope.products = response.data;
					$scope.facets = response.facets;
					$scope.categories = response.categories;
					$scope.subCategories = response.categories.subCategories;
				});

			}

			function getCategory(newSlug) {
				vnApi.Category().get({ slug: newSlug }).$promise.then(function(response) {
					// Handle the category data
					console.log('category response data: ', response);
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


			// Load the url category when the controller is activated.
			getCategory($routeParams.slug);
			//queryProducts();

			// Listen for faceted search updates
			$rootScope.$on('ProductSearch.facetsUpdated', function() {
				//console.log('heard FacetedSearch.update message');
				//console.log('cat scope categories: ', $scope.categories);
				queryProducts();
			});

			// Listen for Sub Category updated
			$rootScope.$on('ProductSearch.categoriesUpdated', function(evt, args) {
				//console.log('evt', evt);
				//console.log('args', args);
				vnProductParams.addCategory(args.categoryId);

				//vnApi.Category().get({ slug: args.category.slug }).$promise.then(function(response) {
				//	// Handle the category data
				//	console.log('category response data: ', response);
				//	$scope.categories = response.data;
				//	vnProductParams.addCategory(response.data.id);
				//	queryProducts();
				//});
				queryProducts();
			});

			// Clean up before this controller is destroyed
			$scope.$on('$destroy', function cleanUp() {
				//console.log('CategoryCtrl is destroyed');
				vnProductParams.resetParamsObject();
			});
		}
	]);
