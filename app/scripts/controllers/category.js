angular.module('Volusion.controllers')
	.controller('CategoryCtrl', [
		'$q', '$scope', '$rootScope', '$routeParams', '$location', '$route', 'vnApi', 'vnProductParams', 'vnAppRoute', 'ContentMgr',
		function ($q, $scope, $rootScope, $routeParams, $location, $route, vnApi, vnProductParams, vnAppRoute, ContentMgr) {

			'use strict';

			$scope.checkForFacetFilters = function () {
				if (vnProductParams.getFacetString()) {
					return true;
				}
			};

			$scope.clearAllFilters = function () {
				vnProductParams.resetParams();
				vnProductParams.addCategory($scope.category.id);
				$scope.queryProducts();
				if ($scope.isMobileAndVisible) {
					$scope.toggleSearch();
				}
			};

			$scope.dismissMobileFilters = function () {
				$scope.toggleSearch();
			};

			$scope.getCategory = function (newSlug) {
				vnApi.Category().get({ slug: newSlug }).$promise.then(function (response) {
					// Handle the category data
					$scope.category = response.data;
					vnProductParams.addCategory(response.data.id);
					$scope.queryProducts();
				});
			};

			$scope.queryProducts = function () {
				var params = vnProductParams.getParamsObject();
				vnApi.Product().get(params).$promise.then(function (response) {

					$scope.products = response.data;
					$scope.facets = response.facets;
					$scope.categoryList = response.categories;
					$scope.cursor = response.cursor;

					// Post response UI Setup
					$scope.checkFacetsAndCategories(response.categories, response.facets);
				});
			};

			$scope.toggleSearch = function () {
				// Remember, this should only ever be called / used from the mobile filter element.
				if ($scope.mobileDisplay) {
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

			$scope.$on('$destroy', function cleanUp() {
				vnProductParams.resetParams();
			});

			$scope.$on('$viewContentLoaded', function () {
				vnAppRoute.setRouteStrategy('category');
				$scope.getCategory($routeParams.slug);
			});
		}
	]);
