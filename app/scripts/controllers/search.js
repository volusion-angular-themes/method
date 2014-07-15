/**
 * @ngdoc function
 * @name methodApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the methodApp
 */
angular.module('methodApp')
	.controller('SearchCtrl', ['$rootScope', '$scope', '$routeParams', '$location', '$window', 'vnApi', 'vnProductParams',
		function ($rootScope, $scope, $routeParams, $location, $window, vnApi, vnProductParams) {
			'use strict';

			// Private SearchCtrl functions
			function queryProducts() {
				var params = vnProductParams.getParamsObject();
				vnApi.Product().query(params).$promise.then(function (response) {
					$scope.products = response.data;
					$scope.facets = response.facets;
					$scope.categories = response.categories;
					$scope.cursor = response.cursor;
				});
			}

			/**
			 * The 'main' part of the controller lives below here.
			 * - set up all the $scope properties
			 * - declare scope level functionality (listeners etc)
			 */

			$scope.searchLocal = '';
			$scope.doSearch = function () {
				$scope.currentSearchText = $scope.searchLocal;

				// Change apps location
				$location.path('/search');
				// Modify the url for these params // Todo: use this as a model to build the url from the vnProductParams value?
				$location.search('q', $scope.searchLocal);
				vnProductParams.updateSearch($scope.searchLocal);
				$scope.lastSearchString = 'blah';
				queryProducts();

				// Clean up the UI for this Controller / Page
				$scope.searchLocal = '';
				// Todo: close search input after this
			};

			$scope.init = function() {
				vnProductParams.updateSearch($routeParams.q);
				queryProducts();
			};

			$rootScope.seo = {};

			$scope.nextPage = function () {

				var currentPage = parseInt(vnProductParams.getPageNumber());
				console.log('the cur page: ', currentPage);
				var nextPage = currentPage + 1;
				vnProductParams.setPageNumber(nextPage.toString());
				queryProducts();

				console.log('go next: ', nextPage.toString());
			};

			$scope.prevPage = function () {
				console.log('go prev');
			};

			// Todo: move this into a directive level w/ ctrl if needed.
			$scope.clearAllFilters = function () {

				// Reset for the service layer (this will reset the stuff generated via directive
				vnProductParams.resetParamsObject();

				//Reset for the price fields
				$scope.minPrice = '';
				$scope.maxPrice = '';
				queryProducts();
			};

			$scope.searchByPrice = function (event) {

				// Detect the return/enter keypress only
				if (event.which === 13) {
					vnProductParams.setMinPrice($scope.minPrice);
					vnProductParams.setMaxPrice($scope.maxPrice);
					queryProducts();
				}
			};

			$scope.toggleSearch = function () {
				if ($scope.mobileDisplay) {
					$scope.mobileDisplay = false;
					return;
				}
				$scope.mobileDisplay = true;
			};

			$scope.showMobileSearch = true; // Flag for view to use when rendering content
			enquire.register('screen and (max-width:767px)', {

				setup  : function () {
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
			// End long Todo.

			// Scope listeners, initialization and cleanup routines
			$scope.init();

			// Listen for faceted search updates
			$rootScope.$on('ProductSearch.facetsUpdated', function () {
				queryProducts();
			});

			// Listen for Sub Category updated
			$rootScope.$on('ProductSearch.categoriesUpdated', function (evt, args) {
				vnProductParams.addCategory(args.categoryId);
				queryProducts();
			});

			// Clean up before this controller is destroyed
			$scope.$on('$destroy', function cleanUp() {
				$scope.searchLocal = '';
			});
		}]);
