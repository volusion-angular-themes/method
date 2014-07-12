'use strict';

angular.module('Volusion.controllers')
	.controller('CategoryCtrl', [
		'$q', '$scope', '$rootScope', '$routeParams', 'vnApi', 'vnProductParams',
		function($q, $scope, $rootScope, $routeParams, vnApi, vnProductParams) {

			function queryProducts() {
				var params = vnProductParams.getParamsObject();
				vnApi.Product().query(params).$promise.then(function(response) {
					$scope.products = response.data;
					$scope.facets = response.facets;
					$scope.categories = response.categories;
//					$scope.currentPage = 1;
//					$scope.totalPages = response.cursor.totalPages;
					$scope.cursor = response.cursor;
					console.log('cursor: ', $scope.cursor);
				});

//				// Hack to get many products into this scope.
//				vnApi.Product().query(params).$promise.then(function(response) {
//					angular.forEach(response.data, function(value) {
//						$scope.products.push(value);
//					});
//				});
//				// Hack to get many products into this scope.
//				vnApi.Product().query(params).$promise.then(function(response) {
//					angular.forEach(response.data, function(value) {
//						$scope.products.push(value);
//					});
//				});
			}

			function getCategory(newSlug) {
				vnApi.Category().get({ slug: newSlug }).$promise.then(function(response) {
					// Handle the category data
					$scope.category = response.data[0];  // Prior to 7-11-2014 it was object, not array. Todo: figure out the proper fix.
					$scope.subCategories = response.data[0].subCategories;
					vnProductParams.addCategory(response.data[0].id);
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

			$scope.nextPage = function() {

				var currentPage = parseInt( vnProductParams.getPageNumber() );
				console.log('the cur page: ', currentPage);
				var nextPage = currentPage + 1;
				vnProductParams.setPageNumber(nextPage.toString());
				queryProducts();

				console.log('go next: ', nextPage.toString());
			};

			$scope.prevPage = function() {
				console.log('go prev');
			};

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

			$scope.toggleSearch = function() {
				if($scope.mobileDisplay) {
					$scope.mobileDisplay = false;
					return;
				}
				$scope.mobileDisplay = true;
			};

			$scope.showMobileSearch = true; // Flag for view to use when rendering content
			enquire.register('screen and (max-width:767px)', {

				setup: function() {
					$scope.mobileDisplay = true;
				},
				unmatch: function () {
					$scope.mobileDisplay = true; // default cats and facets to open
					$scope.showMobileSearch = false;
				},
				// transitioning to mobile mode
				match  : function () {
					$scope.mobileDisplay = false; // default cats and facets default to closed
					$scope.showMobileSearch = true;
				}
			});

			// Load the url category when the controller is activated.
			getCategory($routeParams.slug);

			// Forct the pageSize and pageNumber for now.
//			pageSize: '1', pageNumber: '1'
			vnProductParams.setPageSize('');
			vnProductParams.setPageNumber('1');

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
