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
            templateUrl: '/views/partials/vn-facet-search.html',
            restrict   : 'AE',
            scope      : {
                facets    : '='
            },
            link       : function postLink(scope) {

                scope.$watch('facets', function (facets) {
                    scope.facets = facets;
                });

                scope.selectedFacets = [];

                scope.refineFacetSearch = function (facet) {

                    // Add / Remove facet to selectedFacets
                    if (scope.selectedFacets.indexOf(facet) === -1) {
                        scope.selectedFacets.push(facet);
                        console.log(scope.selectedFacets);
                    } else {
                        var index = scope.selectedFacets.indexOf(facet);
                        scope.selectedFacets.splice(index, 1);
                        console.log(scope.selectedFacets);
                    }
                };
            }
        };
    });
