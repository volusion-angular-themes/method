/*global angular */

angular.module('methodApp')
    .controller('CategoryCtrl', ['$q', '$scope', '$rootScope', '$routeParams', 'vnApi',
        function ($q, $scope, $rootScope, $routeParams, vnApi) {
            'use strict';

            // TODO: refactor this into a service and use that service where it has access to the directive in the header.
            $rootScope.seo = {};

            var slug = {
                slug: $routeParams.slug,
                facets: '1841,1842,1843' // Here is where vn
            };

            vnApi.Category().get(slug).$promise.then(function (response) {
                // Handle the category data
                $scope.category = response.data;
            }).then(function () {
                // Handle the Products & Facets for this page
                // I hate the nested promise here. it is an anti-pattern
                // Is there a better way to store, access & update the categories at model layer?
                vnApi.Product().query({categoryIds: $scope.category.id}).$promise.then(function (response) {
                    $scope.products = response.data;
                    $scope.facets = response.facets;
                    $scope.categories = response.categories;
                });
            });
        }]);
