/**
 * @ngdoc function
 * @name methodApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the methodApp
 */
angular.module('methodApp')
	.controller('SearchCtrl', ['$rootScope', '$scope', '$routeParams', '$location', '$window', '$filter', 'vnApi', 'vnProductParams', 'ContentMgr', 'themeSettings', 'vnAppRoute',
		function ($rootScope, $scope, $routeParams, $location, $window, $filter, vnApi, vnProductParams, ContentMgr, themeSettings, vnAppRoute) {

			'use strict';

			$scope.searchLocal = '';
			$scope.searchTerms = '';

			$scope.$watch(
				function () {
					return vnProductParams.getSearchText();
				},
				function () {
					$scope.queryProducts();
				}
			);

			$scope.queryProducts = function() {
				var params = vnProductParams.getParamsObject();
				vnApi.Product().query(params).$promise.then(function (response) {
					$scope.products = response.data;
					$scope.facets = response.facets;
					$scope.categoryList = response.categories;
					$scope.cursor = response.cursor;

					// Post response UI Setup
					$scope.checkFacetsAndCategories(response.categories,response.facets);
					$scope.searchTerms = vnProductParams.getSearchText() || 'All Products';
				});
			};

			$scope.getImagePath = function (imageCollections) {
				// This gets the default:medium image for the product
				var path = $filter('vnProductImageFilter')(imageCollections);

				if ('' === path) {
					return '/images/theme/tcp-no-image.jpg';
				}

				return path;
			};

			$scope.doSearch = function () {
				$scope.currentSearchText = $scope.searchLocal;

				// Unify scope variable to match $routeParams when reloading the page
//				$scope.searchTerms = { 'q' : $scope.searchLocal};

				if('/search' !== $location.path()) {
					$location.path('/search');
				}
				// Modify the url for these params // Todo: use this as a model to build the url from the vnProductParams value?
//				$location.search('q', $scope.searchLocal);

				vnProductParams.updateSearch($scope.currentSearchText);
			};

			$scope.checkFacetsAndCategories = function(categories, facets) {

				if( (categories && categories.length) || (facets && facets.length) ) {
					$scope.hasFacetsOrCategories = true;
				} else {
					$scope.hasFacetsOrCategories = false;
				}

			};

			$scope.initParams = function() {
				vnProductParams.setPageSize(themeSettings.getPageSize());
				if (!$routeParams.q) {
					$scope.searchTerms = 'All Products';
					$scope.queryProducts();
				} else {
					vnProductParams.updateSearch($routeParams.q);
					$scope.searchTerms = $routeParams.q;
					$scope.queryProducts();
				}
			};


			$scope.clearAllFilters = function () {
				vnProductParams.resetParams();

				vnProductParams.setSort('relevance'); // Is default when
				vnProductParams.updateSearch($routeParams.q);

				//Reset for the price fields
				$scope.minPrice = '';
				$scope.maxPrice = '';
				$scope.queryProducts();
			};

			$scope.searchByPrice = function (event) {

				// Detect the return/enter keypress only
				if (event.which === 13) {
					vnProductParams.setMinPrice($scope.minPrice);
					vnProductParams.setMaxPrice($scope.maxPrice);
					$scope.queryProducts();
				}
			};

			$scope.toggleSearch = function() {
				// Remember, this should only ever be called / used from the mobile filter element.
				if($scope.mobileDisplay) {
					$scope.mobileDisplay = false;
					$scope.isMobileAndVisible = false;
					$scope.isMobileAndHidden = true;
					ContentMgr.showAppFooter();
					return;
				}
				$scope.mobileDisplay = true;
				$scope.isMobileAndVisible = true;
				$scope.isMobileAndHidden = false;
				ContentMgr.hideAppFooter();
			};

			$scope.dismissMobileFilters = function() {
				$scope.toggleSearch();
			};

			// Scope listeners, initialization and cleanup routines
			$scope.initParams();

			// First time view / controller is loaded (or reloaded) Initialization tasks
			$scope.$on('$viewContentLoaded', function() {
				vnAppRoute.setRouteStrategy('search');
				vnProductParams.preLoadData($routeParams);
			});

			// Clean up tasks when this controller is destroyed
			$scope.$on('$destroy', function cleanUp() {
				vnProductParams.resetParams();
			});
		}]);
