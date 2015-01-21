/**
 * @ngdoc function
 * @name methodApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the methodApp
 */
angular.module('methodApp')
	.controller('SearchCtrl', ['$rootScope', '$scope', '$stateParams', '$location', '$window', '$filter', 'vnApi', 'vnProductParams', 'vnContentManager', 'themeSettings', 'vnAppRoute',
		function ($rootScope, $scope, $stateParams, $location, $window, $filter, vnApi, vnProductParams, vnContentManager, themeSettings, vnAppRoute) {

			'use strict';

            $scope.searchLocal = vnProductParams.getSearchText();
			$scope.searchTerms = $stateParams.q;

			$scope.clearAllFilters = function () {
				vnProductParams.resetParams();
				vnProductParams.setSort('relevance'); // Is default when
				vnProductParams.updateSearch($stateParams.q);
				$scope.minPrice = '';
				$scope.maxPrice = '';
				$scope.queryProducts();
			};

			$scope.dismissMobileFilters = function() {
				$scope.toggleSearch();
			};

			$scope.initParams = function() {
				vnProductParams.setPageSize(themeSettings.getPageSize());
				if (!$stateParams.q) {
					$scope.searchTerms = $location.search('q', 'All Products');
					$scope.queryProducts();
				} else {
					vnProductParams.updateSearch($stateParams.q);
					$scope.searchTerms = $stateParams.q;
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
					vnContentManager.showAppFooter();
					return;
				}
				$scope.mobileDisplay = true;
				$scope.isMobileAndVisible = true;
				$scope.isMobileAndHidden =
				vnContentManager.hideAppFooter();
			};

			$scope.$on('$destroy', function cleanUp() {
				vnProductParams.resetParams();
			});

			$scope.$on('$viewContentLoaded', function() {
				$scope.initParams();
				vnAppRoute.setRouteStrategy('search');
				vnProductParams.preLoadData($stateParams);
			});

		}]);
