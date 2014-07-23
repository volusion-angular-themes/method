angular.module('Volusion.controllers')
	.controller('CategoryCtrl', [
		'$q', '$scope', '$rootScope', '$routeParams', '$location', 'vnApi', 'vnProductParams', 'ContentMgr',
		function($q, $scope, $rootScope, $routeParams, $location, vnApi, vnProductParams, ContentMgr) {

			'use strict';

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
				});
			};

			$scope.toggleSearch = function() {
				// Remember, this should only ever be called / used from the mobile filter element.
				if($scope.mobileDisplay) {
					$scope.mobileDisplay = false;
					$scope.isMobileAndVisible = false;
					$scope.isMobileAndHidden = true;
					ContentMgr.showAppFooter();
					ContentMgr.showSnapMenuState();
					return;
				}
				$scope.mobileDisplay = true;
				$scope.isMobileAndVisible = true;
				$scope.isMobileAndHidden = false;
				ContentMgr.hideAppFooter();
				ContentMgr.hideSnapMenuState();
			};

			$scope.clearAllFilters = function () {
				vnProductParams.resetParamsObject();
				//Reset for the price fields
				$scope.minPrice = '';
				$scope.maxPrice = '';

				vnProductParams.addCategory($scope.category.id);
				$scope.queryProducts();
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
				},
				unmatch: function () {
					$scope.mobileDisplay = true; // default cats and facets to open
					$scope.showMobileSearch = false;
					$scope.isMobileAndVisible = false;
					$scope.isMobileAndHidden = true;
				},
				// transitioning to mobile mode
				match  : function () {
					$scope.mobileDisplay = false; // default cats and facets default to closed
					$scope.showMobileSearch = true;
					$scope.isMobileAndVisible = false;
					$scope.isMobileAndHidden = true;
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

			// Listen for faceted search updates
			$rootScope.$on('ProductSearch.facetsUpdated', function() {
				$scope.queryProducts();
			});

			// Listen for Sub Category updated
			$rootScope.$on('ProductSearch.categoriesUpdated', function(evt, args) {
				vnProductParams.addCategory(args.categoryId);
				$scope.queryProducts();
			});

			// Clean up before this controller is destroyed
			$scope.$on('$destroy', function cleanUp() {
				vnProductParams.resetParamsObject();
			});
		}
	]);
