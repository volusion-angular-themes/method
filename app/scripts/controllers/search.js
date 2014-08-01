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

					// Post response UI Setup
					$scope.checkFacetsAndCategories(response.categories,response.facets);
				});
			};

			//Todo: move this into a central service so logic tied to api contract only has to be updated in one place
			// Currently search ctrl & categoryctrl implement this fn
			$scope.getDefaultImage = function (product) {
				var imgPath = '';
				if(product.imageCollections.length === 0) {
					imgPath = '/images/theme/tcp-no-image.jpg';
				} else {
					for(var i = product.imageCollections.length - 1; i >=0; i--) {
						var currentImageCollection = product.imageCollections[i];
						if('default' === currentImageCollection.key) {
							console.log('http:' + currentImageCollection.images[0].medium);
							imgPath = 'http:' + currentImageCollection.images[0].medium;
							break;
						}
					}
				}
				return imgPath;
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
