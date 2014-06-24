'use strict';

angular.module('methodApp')
    .factory('vnFacetSelections', function () {
        // Service logic
        // ...

        var selectedFacets = [];

        function addFacet(id) {
            selectedFacets.push(id);
        }

        function getFacetString() {
            // stringify the facets array and return it.
        }

        function isFacet(id) {
            //return true if id is in the selectedFacets array, else flase
        }

        function removeFacet(id) {
            var index = selectedFacets.indexOf(facet);
            selectedFacets.splice(index, 1);
        }

        // Public API here
        return {
            addFacet      : addFacet,
            getFacetString: getFacetString,
            isFacet       : isFacet
            removeFacet   : removeFacet
        };
    });
