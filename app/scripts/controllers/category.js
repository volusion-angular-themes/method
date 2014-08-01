angular.module('Volusion.controllers')
	.controller('CategoryCtrl', [
		'$q', '$scope', '$rootScope', '$routeParams', '$location', 'vnApi', 'vnProductParams', 'ContentMgr',
		function($q, $scope, $rootScope, $routeParams, $location, vnApi, vnProductParams, ContentMgr) {

			'use strict';

			// TODO : Prune this code if not needed
//			var search = $location.search();
//			var queryString = {};
//
//			angular.forEach(search, function(value, key) {
//				queryString[key.toLowerCase()] = value;
//			});

			$scope.getCategory = function(newSlug) {
				vnApi.Category().get({ slug: newSlug }).$promise.then(function(response) {
					// Handle the category data
					$scope.category = response.data;
					vnProductParams.addCategory(response.data.id);
					$scope.queryProducts();
				});
			};

			$scope.queryProducts = function() {
				var params = vnProductParams.getParamsObject();
				vnApi.Product().query(params).$promise.then(function(response) {

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

			$scope.checkFacetsAndCategories = function(categories, facets) {

				if( (categories && categories.length) || (facets && facets.length) ) {
					$scope.hasFacetsOrCategories = true;
				} else {
					$scope.hasFacetsOrCategories = false;
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

			$scope.clearAllFilters = function () {
				vnProductParams.resetParamsObject();

				vnProductParams.addCategory($scope.category.id);
				$scope.queryProducts();
				if($scope.isMobileAndVisible) {
					$scope.toggleSearch();
				}
			};

			$scope.dismissMobileFilters = function() {
				$scope.toggleSearch();
			};

			// Load the url category when the controller is activated.
			$scope.getCategory($routeParams.slug);

			// Check for applied facet filters

			$scope.checkForFacetFilters = function() {

				if ( vnProductParams.getFacetString() ) {
					return true;
				}

			};

			// Clean up before this controller is destroyed
			$scope.$on('$destroy', function cleanUp() {
				vnProductParams.resetParamsObject();
			});
		}
	]);
