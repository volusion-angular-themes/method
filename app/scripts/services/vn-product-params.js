/*global angular */

angular.module('Volusion.services')
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
            categoryIds  : '',
            slug         : '',
            facets       : '',
            minPrice     : '',
            maxPrice     : '',
            accessoriesOf: '',
            sort         : '',
            pageNumber   : '',
            pageSize     : ''
        };


        /**
         * Category functionality
         */
        function addCategory(id) {
            categoryIds.push(id);
            paramsObject.categoryIds = getCategoryString();
        }

        function getCategoryString() {
            return categoryIds.join(',');
        }

        function removeCategory(id) {
            var index = categoryIds.indewxOf(id);
            categoryIds.splice(index, 1);
            paramsObject.categoryIds = getCategoryString();
        }


        /**
         * The Params Object Functionality
         */

        function getParamsObject() {
            return paramsObject;
        }

        function resetParamsObject() {
            paramsObject = {
                categoryIds  : '',
                slug         : '',
                facets       : '',
                minPrice     : '',
                maxPrice     : '',
                accessoriesOf: '',
                sort         : '',
                pageNumber   : '',
                pageSize     : ''
            };
        }

        /**
         * Facets functionality
         */
        function addFacet(id) {
            facets.push(id);
            paramsObject.facets = getFacetString();
        }

        function getFacetString() {
            // stringify the facets array and return it.
            return facets.join(',');
        }

        function isFacetSelected(id) {
            //return true if id is in the selectedFacets array, else false
            return (facets.indexOf(id) > -1);
        }

        function removeFacet(id) {
            var index = facets.indexOf(id);
            facets.splice(index, 1);
            paramsObject.facets = getFacetString();
        }

        // Public API here
        return {
            addCategory      : addCategory,
            removeCategory   : removeCategory,
            addFacet         : addFacet,
            isFacetSelected  : isFacetSelected,
            removeFacet      : removeFacet,
            getParamsObject  : getParamsObject,
            resetParamsObject: resetParamsObject
        };
    });


