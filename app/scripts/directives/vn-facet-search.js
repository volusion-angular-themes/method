/* global console */


/**
 * @ngdoc directive
 * @name Volusion.methodApp.directive:vnFacetSearch
 * @restrict EA
 * @requires facet object
 * @scope
 * @description
 *
 * Given a product facet object create the UI for the facets response.
 * Allow parent controller to be updated with user controlled actions select/de-select
 *
 * @usage
 <div vn-facet-search facets="facets"></div>

 -OR-------------------------------------

 <vn-facet-search facets="facets"></vn-facet-search>
 *
 *
 * @example
 <example module="Volusion.methodApp" deps="">
 TODO: Insert example html and javascript.
 </example>
 */
angular.module('methodApp')
    .directive('vnFacetSearch', function () {
        'use strict';

        return {
            templateUrl: 'views/vn-facet-search.html',
            restrict   : 'AE',
            scope      : {
                facets    : '=',
                categories: '='
            },
            link       : function postLink(scope) {

                scope.$watch('facets', function (facets) {
                    scope.facets = facets;
                });

                scope.$watch('categories', function (categories) {
                    scope.categories = categories[0];
                    angular.forEach(categories[0].subCategories, function(i) {
                        console.log(i);
                    });
                    console.log('type of: ',  categories[0].subCategories);
                    console.log('type of: ',  categories[0]);
                });

                scope.selectedFacets = [];

                scope.refineFacetSearch = function (facet) {

                    // Add / Remove facet to selectedFacets

                    if (scope.selectedFacets.indexOf(facet) === -1) {
                        scope.selectedFacets.push(facet);
                        console.log('prop not found adding', scope.selectedFacets);
                    } else {
                        var index = scope.selectedFacets.indexOf(facet);
                        scope.selectedFacets.splice(index, 1);
                        console.log('else assume prop was found and removeing', scope.selectedFacets);
                    }
//
//                    console.log('selectedFacets: ', scope.selectedFacets);
                };
            }
        };
    });
