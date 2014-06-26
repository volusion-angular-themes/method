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

        var categoryIds = [],    // Container for the category id's to query for
            facets = [],             // Container for the facets to query for
            //        currentPageNumber = '',
            //        nextPageNumber = '',
            //        previousPageNumber = '',
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
         * Page number management
         * - when do I know which page I am currently on? Prolly set in the vnApi response
         * - when do I update the next / previous pages? Prolly in the vnApi response if I can intercept it there
         * - how does the category page add this to the request given some basic information
         * - Have not done any implementation on this since the data set is small right now
         */

        /**
         * Sort Management
         */
        function setSort(sortString) {
            paramsObject.sort = sortString;
        }

        function getSort() {
            return paramsObject.sort;
        }

        function removeSort() {
            paramsObject.sort = '';
        }

        /**
         * Accessories Of Management
         */
        function setAccessoriesOf(productCode) {
            paramsObject.accessoriesOf = productCode;
        }

        function getAccessoriesOf() {
            return paramsObject.accessoriesOf;
        }

        function removeAccessoriesOf() {
            paramsObject.accessoriesOf = '';
        }

        /**
         * Price Management
         */
        function setMaxPrice(numString) {
            paramsObject.maxPrice = numString;
        }

        function getMaxPrice() {
            return paramsObject.maxPrice;
        }

        function removeMaxPrice() {
            paramsObject.maxPrice = '';
        }

        function setMinPrice(numString) {
            paramsObject.minPrice = numString;
        }

        function getMinPrice() {
            return paramsObject.minPrice;
        }

        function removeMinPrice() {
            paramsObject.minPrice = '';
        }


        /**
         * Search String Management
         */
        function updateSearch(string) {
            paramsObject.search = string;
        }

        function removeSearch() {
            paramsObject.search = '';
        }

        /**
         * Slug Management
         */
        function updateSlug(newSlug) {
            paramsObject.slug = newSlug;
        }

        function removeSlug() {
            paramsObject.slug = '';
        }


        /**
         * Category Management
         */
        function addCategory(id) {
            //
            if(categoryIds.indexOf(id) < 0) {
                categoryIds.push(id);
                paramsObject.categoryIds = getCategoryString();
            }

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
         * Returned Params Object Management
         */

        function getParamsObject() {
            return paramsObject;
        }

        function resetParamsObject() {
            categoryIds = [];
            facets = [];
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
         * Facets Management
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
            return (facets.indexOf(id) > -1);
        }

        function removeFacet(id) {
            var index = facets.indexOf(id);
            facets.splice(index, 1);
            paramsObject.facets = getFacetString();
        }

        // Public API here
        return {
            addCategory        : addCategory,
            getAccessoriesOf   : getAccessoriesOf,
            addFacet           : addFacet,
            getFacetString     : getFacetString,
            getMinPrice        : getMinPrice,
            getMaxPrice        : getMaxPrice,
            getParamsObject    : getParamsObject,
            getSort            : getSort,
            isFacetSelected    : isFacetSelected,
            removeSlug         : removeSlug,
            removeSearch       : removeSearch,
            setMinPrice        : setMinPrice,
            removeMinPrice     : removeMinPrice,
            removeMaxPrice     : removeMaxPrice,
            removeAccessoriesOf: removeAccessoriesOf,
            removeCategory     : removeCategory,
            removeFacet        : removeFacet,
            removeSort         : removeSort,
            resetParamsObject  : resetParamsObject,
            setAccessoriesOf   : setAccessoriesOf,
            setMaxPrice        : setMaxPrice,
            setSort            : setSort,
            updateSearch       : updateSearch,
            updateSlug         : updateSlug
        };
    });


