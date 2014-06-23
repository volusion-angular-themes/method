/*global angular, console */

angular.module('methodApp')
    .controller('CategoryCtrl', ['$scope', '$rootScope', '$location', 'vnApi',
        function ($scope, $rootScope, $location, vnApi) {
            'use strict';

            $rootScope.seo = {};

            /**
             * Private functions for the CategoryCtrl
             */

            /**
             * @ngdoc method
             * @name getBrandFromFacets
             * @methodOf methodApp.CategoryCtrl
             * @params {Object} facet
             * @returns {Object} brand is an object parsed from response.facets when calling the product endpoint
             *
             * @description
             * In order to make use of brand specific data in the category view the CategoryCtrl needs to parse it and
             * set $scope variables that are accessible in the category.html view. This is a private
             *
             */
            function getBrandFromFacets(facets) {
                var item,
                    obj;

                if (facets.hasOwnProperty(item)) {
                    for (item in facets) {
                        obj = facets[item];
                        if (obj.title && obj.title === 'Brand') {
                            // api structure is: response.facets
                            // facets structure for brands is obj.title === brand && obj.properties === Array of brands
                            return obj.properties;
                        }
                    }
                }

                // If code execution gets here there is an error
                throw new Error('CategoryCtrl: Did not find a brand object in the facets object from api.');

            }

            /**
             * @ngdoc method
             * @name getColorFromFacets
             * @methodOf methodApp.CategoryCtrl
             * @params {Object} facet
             * @returns {Object} color is an object parsed from response.facets when calling the product endpoint
             *
             * @description
             * In order to make use of brand specific data in the category view the CategoryCtrl needs to parse it and
             * set $scope variables that are accessible in the category.html view. This is a private
             *
             */
            function getColorFromFacets(facets) {
                var item,
                    obj;

                for (item in facets) {
                    if (facets.hasOwnProperty(item)) {
                        obj = facets[item];
                        if (obj.title && obj.title === 'Color') {
                            // api response structure is: response.facets
                            // facets structure for color is obj.title === brand && obj.properties === Array of brands
                            console.log('How does app determine the colors? ', obj);
                            return obj.properties;
                        }
                    }
                }
                // If code execution gets here there is an error
                throw new Error('CategoryCtrl: Did not find a brand object in the facets object from api.');

            }

            /**
             * End private functions for the CategoryCtrl
             */

            /**
             * 'Public' functions for CategoryCtrl
             */
            $scope.selectBrand = function () {
                console.log('update for the brand: ', $scope.brand);
            };

//            TODO: Change this to use $routeParams and couple that to the :id or :slug as it may be
//            console.log('category api info: ', vnApi.getCategory());
            var slug = {
                    slug: $location.path().split('/')[2]
                },
                categoryRequest = vnApi.Category().get(slug);

            // TODO: shuffle this so the promises are more intuative and flow logically. Prolly use the $q.all.
            categoryRequest.$promise.then(function (response) {
                // Handle the category data
//                console.log('response: ', response);
                $scope.category = response.data;
                // Todo: move the subCategory parsing to product response
                $scope.subCategories = $scope.category.subCategories;
            }).then(function () {
                // Handle the products for this category
                var productRequest = vnApi.Product().query({categoryIds: $scope.category.id});
                productRequest.$promise.then(function (response) {
//                    console.log('the response 2nd: ', response);
//                    console.log('the response: ', response);
                    $scope.products = response.data;
                    $scope.brands = getBrandFromFacets(response.facets);
                    $scope.colors = getColorFromFacets(response.facets);
                });
            });
        }]);
