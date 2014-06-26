/*global angular */

angular.module('methodApp')
    .controller('CategoryCtrl', ['$q', '$scope', '$rootScope', '$routeParams', 'vnApi', 'vnProductParams',
        function ($q, $scope, $rootScope, $routeParams, vnApi, vnProductParams) {
            'use strict';

            // Perhaps refactor this to updateProducts?
            function queryProducts() {

                var params = vnProductParams.getParamsObject();
                vnApi.Product().query(params).$promise.then(function (response) {
                    console.log('product response.data', response);
                    $scope.products = response.data;
                    $scope.facets = response.facets;
                    $scope.categories = response.categories;
                });

            }

            function getCategory(newSlug) {
                vnApi.Category().get({slug: newSlug}).$promise.then(function (response) {
                    // Handle the category data
                    console.log('category response data: ', response);
                    $scope.category = response.data;
                    vnProductParams.addCategory(response.data.id);
                    queryProducts();
                });
            }

            /**
             * The 'main' part of the controller lives below here.
             * - set up all the $scope properties
             * - declare scope level functionality (listeners etc)
             */
            // TODO: refactor this into a service and use that service where it has access to the directive in the header.
            $rootScope.seo = {};
            $scope.currentCategory = {};


            // Load the url category when the controller is activated.
            getCategory($routeParams.slug);
//            queryProducts();

            // Listen for faceted search updates
            $rootScope.$on('ProductSearch.facetsUpdated', function () {
//                console.log('heard FacetedSearch.update message');
                queryProducts();
            });

            // Listen for Sub Category updated
            $rootScope.$on('ProductSearch.categoriesUpdated', function (evt, args) {
//                console.log('evt', evt);
//                console.log('args', args);
                getCategory(args.caegorytId);
            });

            // Clean up before this controller is destroyed
            $scope.$on('$destroy', function cleanUp() {
//                console.log('CategoryCtrl is destroyed');
                vnProductParams.resetParamsObject();
            });

        }]);
