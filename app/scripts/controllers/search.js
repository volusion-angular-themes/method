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

            $scope.searchLocal = vnProductParams.getSearchText();
			$scope.searchTerms = $routeParams.q;

			$scope.checkFacetsAndCategories = function(categories, facets) {
				if( (categories && categories.length) || (facets && facets.length) ) {
					$scope.hasFacetsOrCategories = true;
				} else {
					$scope.hasFacetsOrCategories = false;
				}
			};

			$scope.clearAllFilters = function () {
				vnProductParams.resetParams();
				vnProductParams.setSort('relevance'); // Is default when
				vnProductParams.updateSearch($routeParams.q);
				$scope.minPrice = '';
				$scope.maxPrice = '';
				$scope.queryProducts();
			};

			$scope.dismissMobileFilters = function() {
				$scope.toggleSearch();
			};

			$scope.doSearch = function () {
				$scope.currentSearchText = $scope.searchLocal;
				if('/search' !== $location.path()) {
					$location.path('/search');
				}
				vnProductParams.updateSearch($scope.currentSearchText);
			};

			$scope.getImagePath = function (imageCollections) {
				var path = $filter('vnProductImageFilter')(imageCollections);
				if ('' === path) {
					return '/images/theme/tcp-no-image.jpg';
				}
				return path;
			};

			$scope.initParams = function() {
				vnProductParams.setPageSize(themeSettings.getPageSize());
				if (!$routeParams.q) {
					$scope.searchTerms = $location.search('q', 'All Products');
					$scope.queryProducts();
				} else {
					vnProductParams.updateSearch($routeParams.q);
					$scope.searchTerms = $routeParams.q;
					$scope.queryProducts();
				}
			};

			$scope.queryProducts = function() {
				var params = vnProductParams.getParamsObject();
				vnApi.Product().get(params).$promise.then(function (response) {
					$scope.products = response.data;
					$scope.facets = response.facets;
					$scope.categoryList = response.categories;
					$scope.cursor = response.cursor;

					// Post response UI Setup
					$scope.checkFacetsAndCategories(response.categories,response.facets);
					$scope.searchTerms = vnProductParams.getSearchText() || 'All Products';
				});
			};

			$scope.searchByPrice = function (event) {
				if (event.which === 13) {
					vnProductParams.setMinPrice($scope.minPrice);
					vnProductParams.setMaxPrice($scope.maxPrice);
					$scope.queryProducts();
				}
			};

			$scope.toggleSearch = function() {
				if($scope.mobileDisplay) {
					$scope.mobileDisplay = false;
					$scope.isMobileAndVisible = false;
					$scope.isMobileAndHidden = true;
					ContentMgr.showAppFooter();
					return;
				}
				$scope.mobileDisplay = true;
				$scope.isMobileAndVisible = true;
				$scope.isMobileAndHidden =
				ContentMgr.hideAppFooter();
			};

			$scope.$on('$destroy', function cleanUp() {
				vnProductParams.resetParams();
			});

			$scope.$on('$viewContentLoaded', function() {
				$scope.initParams();
				vnAppRoute.setRouteStrategy('search');
				vnProductParams.preLoadData($routeParams);
			});

			$scope.$watch(
				function () {
					return vnProductParams.getSearchText();
				},
				function () {
					$scope.queryProducts();
				}
			);
		}]);
