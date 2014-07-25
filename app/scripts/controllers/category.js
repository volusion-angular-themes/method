angular.module('Volusion.controllers')
	.controller('CategoryCtrl', [
		'$q', '$scope', '$rootScope', '$routeParams', 'vnApi', 'vnProductParams',
		function($q, $scope, $rootScope, $routeParams, vnApi, vnProductParams) {

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
					$scope.category = response.data.id;  // Prior to 7-11-2014 it was object, not array. Todo: figure out the proper fix.
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
				if($scope.mobileDisplay) {
					$scope.mobileDisplay = false;
					$scope.isMobileAndVisible = false;
					$scope.isMobileAndHidden = true;
					return;
				}
				$scope.mobileDisplay = true;
				$scope.isMobileAndVisible = true;
				$scope.isMobileAndHidden = false;
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
				$scope.clearAllFilters();
			});
		}
	]);
