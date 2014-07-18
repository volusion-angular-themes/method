/**
* @ngdoc directive
* @name methodApp.directive:facetedSearch
* @restrict EA
* @requires vnProductParams
* @scope
* @description
* - Used on pages that have a list of products and need to filter or narrow the list by:
*     - category
*     - facet
*     - price
*     - sort?
*
* ## Notes:
* - The parent controller for the directive muxt implement a queryProducts() function
* - The Function must implement its get products routine with the vnParamsObject
*
* @usage
* TODO: Add html and javascript here to demo it in docs.
*/
angular.module('methodApp')
	.directive('facetedSearch', ['vnProductParams', function (vnProductParams) {

		'use strict';

		return {
			templateUrl: 'views/partials/faceted-search.html',
			restrict   : 'EA',
			link       : function postLink(scope) {

				scope.showCategorySearch = false;
				scope.showFacetSearch = false;
				scope.showApplyButton = false;

				enquire.register('screen and (max-width:767px)', {

					setup: function() {
						scope.showApplyButton = false;
					},
					unmatch: function () {
						scope.showApplyButton = false;
					},
					// transitioning to mobile mode
					match  : function () {
						scope.showApplyButton = true;
					}
				});

				scope.searchByPrice = function (event) {
					// Detect the return/enter keypress only
					if (event.which === 13) {
						console.log('scope.minPrice: ', scope.minPrice);
						vnProductParams.setMinPrice(scope.minPrice);
						vnProductParams.setMaxPrice(scope.maxPrice);
						scope.queryProducts();
					}
				};

				scope.clearAllFilters = function () {
					console.log('work through categories controller reset flow.');
					// Reset for the service layer (this will reset the stuff generated via directive
					vnProductParams.resetParamsObject();

					//Reset for the price fields
					scope.minPrice = '';
					scope.maxPrice = '';
					scope.queryProducts();
				};

				scope.$watch('categoryList', function (categoryList) {

					if(categoryList) {
						console.log('facet search directive has sub cats');
						scope.showCategorySearch = true;
					}

				});

				scope.$watch('facets', function (facets) {

					if (facets) {
						scope.showFacetSearch = true;
					}

				});
			}
		};
	}]);
