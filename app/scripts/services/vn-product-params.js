/*global angular */

/**
 * @ngdoc service
 * @name Volusion.toolboxCommon.vnProductParams

 * @description
 *
 * # vnProductParams
 * This is service that manages product requests to the back end. Depeneding on directives values or actions the state
 * of the paramsObject can be stored used for a new request. This was implemented to get the facetd serch working with
 * the vnCategorySearch & vnFacetSearch Directives. Future reqirements will make use of the service for
 *  - managing paging of products on the category pages
 *  - parsing the url for bookmarked links to load a pre-set query to that has been shared
 *  - modifying the url to update it based on paramsObject contents.
 *
 */

angular.module('Volusion.toolboxCommon')
    .factory('vnProductParams', function () {

        'use strict';

        /**
         * @ngdoc property
         * @name accountData
         * @property {Array} categoryIds
         * @propertyOf Volusion.toolboxCommon.vnProductParams
         *
         * @description
         * An array to hold category ids that have been selected by someone.
         */
        var categoryIds = [],    // Container for the category id's to query for
        /**
         * @ngdoc property
         * @name facets
         * @property {Array} facets
         * @propertyOf Volusion.toolboxCommon.vnProductParams
         *
         * @description
         * An array to hold facet ids that have been selected by someone.
         */
        facets = [],             // Container for the facets to query for
        //        currentPageNumber = '',
        //        nextPageNumber = '',
        //        previousPageNumber = '',
        /**
         * @ngdoc property
         * @name paramsObject
         * @property {Array} paramsObject
         * @propertyOf Volusion.toolboxCommon.vnProductParams
         *
         * @description
         * An object that holds properties representing all the possible product api parameter options. It should be
         * passed to the vnApi.Products().get( paramsObject ); and used with a promises pattern.
         */
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
         * @ngdoc function
         * @name setSort
         * @param {String} sortString is a string that can be passed to api to modify the sorting of the results
         * @methodOf Volusion.toolboxCommon.vnProductParams
         *
         * @description
         * Setter for the paramsObject sort property.
         */
        function setSort(sortString) {
            paramsObject.sort = sortString;
        }

        /**
         * @ngdoc function
         * @name getSort
         * @methodOf Volusion.toolboxCommon.vnProductParams
         *
         * @description
         * Getter for the paramsObject sort property.
         */
        function getSort() {
            return paramsObject.sort;
        }

        /**
         * @ngdoc function
         * @name removeSort
         * @methodOf Volusion.toolboxCommon.vnProductParams
         *
         * @description
         * reset the paramsObject.sort property.
         */
        function removeSort() {
            paramsObject.sort = '';
        }

        /**
         * @ngdoc function
         * @name setAccessories
         * @param {String} productCode is a string that will cause the api to return accessories of the product code.
         * @methodOf Volusion.toolboxCommon.vnProductParams
         *
         * @description
         * Setter for the paramsObject accessoriesOf property.
         */
        function setAccessoriesOf(productCode) {
            paramsObject.accessoriesOf = productCode;
        }

        /**
         * @ngdoc function
         * @name getAccessoriesOf
         * @methodOf Volusion.toolboxCommon.vnProductParams
         *
         * @description
         * Getter for the paramsObject accessoriesOf property.
         */
        function getAccessoriesOf() {
            return paramsObject.accessoriesOf;
        }

        /**
         * @ngdoc function
         * @name removeAccessoriesOf
         * @methodOf Volusion.toolboxCommon.vnProductParams
         *
         * @description
         * reset the paramsObject.accessoriesOf property.
         */
        function removeAccessoriesOf() {
            paramsObject.accessoriesOf = '';
        }

        /**
         * Price Management
         */
        /**
         * @ngdoc function
         * @name setMaxPrice
         * @param {String} numString is a string representing the max prioce to query product by.
         * @methodOf Volusion.toolboxCommon.vnProductParams
         *
         * @description
         * Setter for the paramsObject.maxPrice  property.
         */
        function setMaxPrice(numString) {
            paramsObject.maxPrice = numString;
        }

        /**
         * @ngdoc function
         * @name getMaxPrice
         * @methodOf Volusion.toolboxCommon.vnProductParams
         *
         * @description
         * Getter for the paramsObject.maxPrice property.
         */
        function getMaxPrice() {
            return paramsObject.maxPrice;
        }

        /**
         * @ngdoc function
         * @name removeMaxPrice
         * @methodOf Volusion.toolboxCommon.vnProductParams
         *
         * @description
         * reset the paramsObject.maxPrice property.
         */
        function removeMaxPrice() {
            paramsObject.maxPrice = '';
        }

        /**
         * @ngdoc function
         * @name setMinPrice
         * @param {String} numString is a string representing the min price to query product by.
         * @methodOf Volusion.toolboxCommon.vnProductParams
         *
         * @description
         * Setter for the paramsObject.minPrice  property.
         */
        function setMinPrice(numString) {
            paramsObject.minPrice = numString;
        }

        /**
         * @ngdoc function
         * @name getMinPrice
         * @methodOf Volusion.toolboxCommon.vnProductParams
         *
         * @description
         * Getter for the paramsObject.minPrice property.
         */
        function getMinPrice() {
            return paramsObject.minPrice;
        }

        /**
         * @ngdoc function
         * @name removeMinPrice
         * @methodOf Volusion.toolboxCommon.vnProductParams
         *
         * @description
         * Reset the paramsObject.minPrice property to ''.
         */
        function removeMinPrice() {
            paramsObject.minPrice = '';
        }

        /**
         * @ngdoc function
         * @name updateSearch
         * @param {String} searchString is a string representing a string types by customer to search on products.
         * @methodOf Volusion.toolboxCommon.vnProductParams
         *
         * @description
         * No matter what, it updates the paramsObject.search property.
         */
        function updateSearch(searchString) {
            paramsObject.search = searchString;
        }

        /**
         * @ngdoc function
         * @name removeSearch
         * @methodOf Volusion.toolboxCommon.vnProductParams
         *
         * @description
         * Reset the paramsObject.search property to ''.
         */
        function removeSearch() {
            paramsObject.search = '';
        }

        /**
         * @ngdoc function
         * @name updateSearch
         * @param {String} newSlug is a string representing the slug value of a product.
         * @methodOf Volusion.toolboxCommon.vnProductParams
         *
         * @description
         * No matter what, it updates the paramsObject.slug property.
         */
        function updateSlug(newSlug) {
            paramsObject.slug = newSlug;
        }

        /**
         * @ngdoc function
         * @name removeSlug
         * @methodOf Volusion.toolboxCommon.vnProductParams
         *
         * @description
         * Reset the paramsObject.slug property to ''.
         */
        function removeSlug() {
            paramsObject.slug = '';
        }

        /**
         * @ngdoc function
         * @name addCategory
         * @methodOf Volusion.toolboxCommon.vnProductParams
         *
         * @description
         * Given an id (as Int I believe at time of writing) If it is not already in the categoryIds array, add it to the
         * categoryIds array and update the paramsObject.categoryIds value.
         */
        function addCategory(id) {
            if(categoryIds.indexOf(id) < 0) {
                categoryIds.push(id);
                paramsObject.categoryIds = getCategoryString();
            }
        }

        /**
         * @ngdoc function
         * @name getCategoryString
         * @methodOf Volusion.toolboxCommon.vnProductParams
         *
         * @description
         * Return the items in categoryIds as a string joined by commas.
         */
        function getCategoryString() {
            return categoryIds.join(',');
        }

        /**
         * @ngdoc function
         * @name removeCategory
         * @methodOf Volusion.toolboxCommon.vnProductParams
         *
         * @description
         * Remove the passed id from the categoryIds array and update the paramsObject.categoryIds value.
         */
        function removeCategory(id) {
            var index = categoryIds.indewxOf(id);
            categoryIds.splice(index, 1);
            paramsObject.categoryIds = getCategoryString();
        }

        /**
         * @ngdoc function
         * @name getParamsObject
         * @methodOf Volusion.toolboxCommon.vnProductParams
         *
         * @description
         * Return the paramsObject in its current state.
         */
        function getParamsObject() {
            return paramsObject;
        }

        /**
         * @ngdoc function
         * @name resetParamsObject
         * @methodOf Volusion.toolboxCommon.vnProductParams
         *
         * @description
         * Return everything in this factory to initial state, blank and fresh and ready for more product searches.
         */
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
         * @ngdoc function
         * @name addFacet
         * @methodOf Volusion.toolboxCommon.vnProductParams
         *
         * @description
         * Add the given id to the facets array and update the paramsObject.facets value.
         *
         * ## Dev note:
         *
         * - this doesn't have a guard for adding duplicates. as I rely on the way I call it in the directive to check
         * if isFacetSelected
         */
        function addFacet(id) {
            facets.push(id);
            paramsObject.facets = getFacetString();
        }

        /**
         * @ngdoc function
         * @name getFacetString
         * @methodOf Volusion.toolboxCommon.vnProductParams
         *
         * @description
         * Return the items in the facets array as a  string joined with commas.
         * if isFacetSelected
         */
        function getFacetString() {
            // stringify the facets array and return it.
            return facets.join(',');
        }

        /**
         * @ngdoc function
         * @name isFacetSelected
         * @methodOf Volusion.toolboxCommon.vnProductParams
         *
         * @description
         * Return true if the id is already in the facets array.
         * Return false if the id is not already in the facets array.
         */
        function isFacetSelected(id) {
            return (facets.indexOf(id) > -1);
        }

        /**
         * @ngdoc function
         * @name removeFacet
         * @methodOf Volusion.toolboxCommon.vnProductParams
         *
         * @description
         * Given an id, remove it from the facets array and update the paramsObject.facets value.
         */
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


