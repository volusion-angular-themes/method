angular.module('methodApp')
    .factory('vnProductParams', function () {
        'use strict';

        var selectedFacets = [];

        function addFacet(id) {
            selectedFacets.push(id);
        }

        function getFacetString() {
            // stringify the facets array and return it.
            return true;
        }

        function isFacet(id) {
            //return true if id is in the selectedFacets array, else false
            return true || id;
        }

        function removeFacet(id) {
            var index = selectedFacets.indexOf(id);
            selectedFacets.splice(index, 1);
        }

        // Public API here
        return {
            addFacet      : addFacet,
            getFacetString: getFacetString,
            isFacet       : isFacet,
            removeFacet   : removeFacet
        };
    });
