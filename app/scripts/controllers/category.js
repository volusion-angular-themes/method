/*global angular */

angular.module('methodApp')
    .controller('CategoryCtrl', ['$q', '$scope', '$rootScope', '$routeParams', 'vnApi', 'vnProductParams',
        function ($q, $scope, $rootScope, $routeParams, vnApi, vnProductParams) {
            'use strict';

            // TODO: refactor this into a service and use that service where it has access to the directive in the header.
            $rootScope.seo = {};

            // Set the category for this page.
            vnProductParams.addCategory($routeParams.slug);

            // Perhaps refactor this to updateProducts?
            function queryProducts () {
                var test = vnProductParams.getParamsObject();
                console.log('productParams query: ', vnProductParams.getParamsObject());
                var params = vnProductParams.getParamsObject();
                vnApi.Category().get(params).$promise.then(function (response) {
                    // Handle the category data
                    $scope.category = response.data;
                }).then(function () {
                    // Handle the Products & Facets for this page
                    // I hate the nested promise here. it is an anti-pattern
                    // Is there a better way to store, access & update the categories at model layer?
                    vnApi.Product().query({categoryIds: $scope.category.id}).$promise.then(function (response) {
                        $scope.products = response.data;
                        $scope.facets = response.facets;
//                        $scope.categories = response.categories;
                    });
                });
            }

            // Load when the controller is activated.
            queryProducts();

            // Listen for facetd search updates
            $rootScope.$on('FacetedSearch.update', function() {
               queryProducts();
            });

            // Clean up beofre this controller is destroyed
            $scope.$on('$destroy', function cleanUp() {
                console.log('CategoryCtrl is destroyed');
                vnProductParams.resetParamsObject();
            })

        }]);
