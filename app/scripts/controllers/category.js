angular.module('Volusion.controllers')
	.controller('CategoryCtrl', [
		'$q', '$scope', '$rootScope', '$routeParams', '$location', 'vnApi', 'vnProductParams', 'ContentMgr',
		function($q, $scope, $rootScope, $routeParams, $location, vnApi, vnProductParams, ContentMgr) {

			'use strict';

			vnProductParams.setPage(1);
			vnProductParams.setPageSize(1);

			$scope.prevPage = function() {
				vnProductParams.previousPage();
				$scope.queryProducts();
			};

			$scope.nextPage = function () {
				vnProductParams.nextPage();
				$scope.queryProducts();
			};

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

					angular.forEach($scope.products, function(product) {
						if (!product.images.default) {
							product.images.default = [];
							product.images.default[0] = {
								'medium' : '/images/theme/tcp-no-image.jpg',
								'large' : '/images/theme/tcp-no-image.jpg',
								'small' : '/images/theme/tcp-no-image.jpg'
							}
						}
					});
				});
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
				//Reset for the price fields
				$scope.minPrice = '';
				$scope.maxPrice = '';

				vnProductParams.addCategory($scope.category.id);
				$scope.queryProducts();
				if($scope.isMobileAndVisible) {
					$scope.toggleSearch();
				}
			};

			$scope.dismissMobileFilters = function() {
				$scope.toggleSearch();
			};

			// Manage the desktop/tablet & mobile faceted-search directive look and feel.
			enquire.register('screen and (max-width:767px)', {

				setup: function() {
					$scope.mobileDisplay = true;
					$scope.showMobileSearch = false;
					$scope.isMobileAndVisible = false;
					$scope.isMobileAndHidden = true;
					$scope.categoryAccordiansOpen = true;
					$scope.priceAccordiansOpen = true;
				},
				unmatch: function () {
					$scope.mobileDisplay = true; // default cats and facets to open
					$scope.showMobileSearch = false;
					$scope.isMobileAndVisible = false;
					$scope.isMobileAndHidden = true;
					$scope.categoryAccordiansOpen = true;
					$scope.priceAccordiansOpen = true;
				},
				// transitioning to mobile mode
				match  : function () {
					$scope.mobileDisplay = false; // default cats and facets default to closed
					$scope.showMobileSearch = true;
					$scope.isMobileAndVisible = false;
					$scope.isMobileAndHidden = true;
					$scope.categoryAccordiansOpen = false;
					$scope.priceAccordiansOpen = false;
				}
			});

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
