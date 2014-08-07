angular.module('Volusion.controllers')
	.controller('CategoryCtrl', [
		'$q', '$scope', '$rootScope', '$routeParams', '$location', '$filter', '$route', 'vnApi', 'vnProductParams', 'ContentMgr',
		function($q, $scope, $rootScope, $routeParams, $location, $filter, $route, vnApi, vnProductParams, ContentMgr) {

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

			// Called from the view
			$scope.getImagePath = function (imageCollections) {
				// This gets the default:medium image for the product
				var path = $filter('vnProductImageFilter')(imageCollections);

				if ('' === path) {
					return '/images/theme/tcp-no-image.jpg';
				}

				return path;
			};

			// Called from the view
			$scope.checkFacetsAndCategories = function(categories, facets) {

				if( (categories && categories.length) || (facets && facets.length) ) {
					$scope.hasFacetsOrCategories = true;
				} else {
					$scope.hasFacetsOrCategories = false;
				}

			};

			// Todo: rename this as its badly named and has nothing to do with our search ctrl or search page.
			// Called from the view
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

			// Called from the view
			$scope.clearAllFilters = function () {
				/** On a product page this means
				 * - clear all facets
				 * - clear min and max prices
				 * - clear all but the current $scope.category.id
				 */
				vnProductParams.resetParamsObject();
				vnProductParams.addCategory($scope.category.id);
				$scope.queryProducts();
				if($scope.isMobileAndVisible) {
					$scope.toggleSearch();
				}
			};

			// Called from the view
			$scope.dismissMobileFilters = function() {
				$scope.toggleSearch();
			};

			// Called from the view: I forget the deatils of how this works MattH - 8-7-2014
			// Check for applied facet filters
			$scope.checkForFacetFilters = function() {
				if ( vnProductParams.getFacetString() ) {
					return true;
				}
			};

			// Load the url category when the controller is activated.
//			$scope.getCategory($routeParams.slug);

//			$scope.$on('$locationChangeSuccess', function (event) {
//				console.log('location change success in catCtrl', event);
//				$scope.getCategory($routeParams.slug);
//			});

			// Manage the routes for this page
//			var lastRoute = $route.current;
			$scope.$on('$locationChangeStart', function (event) {
//				console.log('category location change start with $location: ', $location);
//				console.log('category location change start with event: ', event);

				if(vnProductParams.getSessionState()) {
					console.log('We have an active productParams session', event);
				}
			});

			// First time view / controller is loaded (or reloaded) Initialization tasks
			$scope.$on('$viewContentLoaded', function() {
				if(!vnProductParams.getSessionState()) {
//					console.log('We do not have an active productParams Session', event);
					vnProductParams.startActiveSession();
					$scope.getCategory($routeParams.slug);
				} else {
//					console.log('we do have an active session state, lets resotre it');
					$scope.getCategory($routeParams.slug);
				}
			});

			// Clean up tasks when this controller is destroyed
			$scope.$on('$destroy', function cleanUp() {
				console.log('$location before cleanup: ', $location.path());
				if(vnProductParams.getSessionState() ){  //&& route is not to /c
					console.log('keep session alive');
				} else {
					console.log('end active session');
					vnProductParams.endActiveSession();
				}
			});
		}
	]);
