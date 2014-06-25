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
    .directive('vnFacetSearch', ['$rootScope', 'vnProductParams',
        function ($rootScope, vnProductParams) {
            'use strict';

            return {
                templateUrl: '/views/partials/vn-facet-search.html',
                restrict   : 'AE',
                scope      : {
                    facets: '='
                },
                link       : function postLink(scope) {

                    scope.$watch('facets', function (facets) {
                        scope.facets = facets;
                    });

                    scope.selectProperty = function (facet) {
                        return vnProductParams.isFacetSelected(facet.id);
                    };

                    scope.refineFacetSearch = function (facet) {

                        // Adding / Removeing facet to selectedFacets
                        if (!vnProductParams.isFacetSelected(facet.id)) {
                            vnProductParams.addFacet(facet.id);
//                            console.log('adding facet: ', vnProductParams.getParamsObject());
                        } else {
                            vnProductParams.removeFacet(facet.id);
//                            console.log('removing facet: ', vnProductParams.getParamsObject());
                        }

                        // Broadcast an update to whomever is subscribed.
                        $rootScope.$broadcast('FacetedSearch.update');
                    };
                }
            };
        }]);
