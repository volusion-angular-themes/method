angular.module('methodApp')
    .factory('vnProductParams', function () {
        'use strict';

        /** http://volusion.apiary-mock.com/api/v1/products/?
         * categoryIds=categoryIds&
         * slug=slug
         * &search=search
         * &facets=facets
         * &minPrice=minPrice
         * &maxPrice=maxPrice
         * &accessoriesOf=accessoriesOf
         * &sort=sort
         * &pageNumber=pageNumber
         * &pageSize=pageSize
         */

        var categoryIds = [],    // Needs to return a comma separated string for the query param
            slug = '',
            search = '',
            facets = [],// Needs to return a comma separated string for the query param
            minPrice = '',
            maxPrice = '',
            accessoriesOf = '', // The product-code & it returns products that are it's accessories
            sort = '',     // Sort order keyword of either relevance, lowest price, highest price, newest, oldest, or popularity
            pageNumber = '', // If there are 10 pages for this query the page number we want to retrieve
            pageSize = '',    // the number of products to be returned for this query
            paramsObject = {
                categoryIds: '',
                slug: '',
                facets: '',
                minPrice: '',
                maxPrice: '',
                accessoriesOf: '',
                sort: '',
                pageNumber: '',
                pageSize: ''
            };


        function addFacet(id) {
            selectedFacets.push(id);
            paramsObject.facets = getFacetString();
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
            isFacet       : isFacet,
            removeFacet   : removeFacet
            getParamsObject: getParamsObject
        };
    });


