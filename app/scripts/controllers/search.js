/**
 * @ngdoc function
 * @name methodApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the methodApp
 */
angular.module('methodApp')
	.controller('SearchCtrl', ['$rootScope', '$scope', '$routeParams', '$location', '$window', 'vnApi', 'vnProductParams', 'ContentMgr', 'themeSettings',
		function ($rootScope, $scope, $routeParams, $location, $window, vnApi, vnProductParams, ContentMgr, themeSettings) {
			'use strict';

			$scope.searchLocal = '';
			$scope.searchTerms = '';

			$scope.queryProducts = function() {
				var params = vnProductParams.getParamsObject();
				vnApi.Product().query(params).$promise.then(function (response) {
					$scope.products = response.data;
					$scope.facets = response.facets;
					$scope.categoryList = response.categories;
					$scope.cursor = response.cursor;

					angular.forEach($scope.products, function(product) {
						if (!product.images.default) {
							product.images.default = [];
							product.images.default[0] = {
								'medium' : '/images/theme/tcp-no-image.jpg',
								'large' : '/images/theme/tcp-no-image.jpg',
								'small' : '/images/theme/tcp-no-image.jpg'
							};
						}
					});

					// Post response UI Setup
					$scope.checkFacetsAndCategories(response.categories,response.facets);
				});
			};

			$scope.doSearch = function () {
				$scope.currentSearchText = $scope.searchLocal;

				// Unify scope variable to match $routeParams when reloading the page
				$scope.searchTerms = { 'q' : $scope.searchLocal};

				// This could go both ways ... depends on the route story *****************************
				// Change apps location
				$location.path('/search');
				// Modify the url for these params // Todo: use this as a model to build the url from the vnProductParams value?
				$location.search('q', $scope.searchLocal);

				// ************************************************************************************

//				vnProductParams.updateSearch($scope.searchLocal);
//				$scope.queryProducts();

				// ************************************************************************************
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

				if ($routeParams.q !== undefined && $scope.searchTerms !== $routeParams) {
					vnProductParams.updateSearch($routeParams.q);
					$scope.searchTerms = $routeParams;
					$scope.queryProducts();
				}
			};

			$scope.clearAllFilters = function () {
				vnProductParams.resetParamsObject();
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

			// Clean up before this controller is destroyed
			$scope.$on('$destroy', function cleanUp() {
				vnProductParams.resetParamsObject();
			});
		}]);
