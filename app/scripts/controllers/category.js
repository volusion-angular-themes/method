angular.module('methodApp')
    .controller('CategoryCtrl', ['$scope', '$rootScope', '$location', 'vnApi',
        function ($scope, $rootScope, $location, vnApi) {
            'use strict';

            $rootScope.seo = {};

//            TODO: Change this to use $routeParams and couple that to the :id or :slug as it may be
//            console.log('category api info: ', vnApi.getCategory());

            var slug = {
                slug: $location.path().split('/')[2]
            };
            var categoryRequest = vnApi.Category().get(slug);
            categoryRequest.$promise.then(function(response) {
                // Handle the category data
                console.log('response: ', response);
                $scope.category = response.data;
                $scope.subCategories = $scope.category.subCategories;
            }).then(function() {
                // Handle the products for this category
                var productRequest = vnApi.Product().query({categoryIds: $scope.category.id});
                productRequest.$promise.then(function(response) {
                    console.log(response);
                });
            });
        }]);
