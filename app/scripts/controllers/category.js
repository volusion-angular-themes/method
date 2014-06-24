/*global angular, console */

angular.module('methodApp')
    .controller('CategoryCtrl', ['$scope', '$rootScope', '$location', 'vnApi',
        function ($scope, $rootScope, $location, vnApi) {
            'use strict';

            $rootScope.seo = {};

            /**
             * 'Public' functions for CategoryCtrl
             */
            $scope.selectBrand = function () {
                console.log('update for the brand: ', $scope.brand);
            };

//          TODO: Change this to use $routeParams and couple that to the :id or :slug as it may be
            var slug = {
                slug: $location.path().split('/')[2]
            };

            // TODO: shuffle this so the promises are more intuative and flow logically. Prolly use the $q.all?
            vnApi.Category().get(slug).$promise.then(function (response) {
                // Handle the category data
                $scope.category = response.data;
                // Todo: move the subCategory parsing to product response
//                $scope.subCategories = $scope.category.subCategories;
            }).then(function () {
                // Handle the Products & Facets for this page
                // I hate the nested promise here. it is an anti-pattern
                vnApi.Product().query({categoryIds: $scope.category.id}).$promise.then(function (response) {
                    $scope.products = response.data;
                    $scope.facets = response.facets;
                    $scope.categories = response.categories;
                    console.log('subCats', $scope.categories);
                });
            });
        }]);
