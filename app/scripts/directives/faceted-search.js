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
 * @usage
 * TODO: Add html and javascript here to demo it in docs.
 */
angular.module('methodApp')
	.directive('facetedSearch', ['vnProductParams', function (vnProductParams) {
		return {
			templateUrl: 'views/partials/faceted-search.html',
			restrict   : 'EA',
			link       : function postLink(scope) {

				scope.searchByPrice = function (event) {
					// Detect the return/enter keypress only
					if (event.which === 13) {
						console.log('scope.minPrice: ', scope.minPrice);
						vnProductParams.setMinPrice(scope.minPrice);
						vnProductParams.setMaxPrice(scope.maxPrice);
						scope.queryProducts();
					}
				};
			}
		};
	}]);
