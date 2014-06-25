/*global angular */

angular.module('Volusion.controllers')
    .controller('ProductCtrl', ['$rootScope', '$scope', 'vnApi', '$sce', '$location', '$routeParams', '$anchorScroll',
        function ($rootScope, $scope, vnApi, $sce, $location, $routeParams, $anchorScroll) {

            'use strict';

            var product = {},
                cartItem = {};

            // carousel
            $scope.carousel = {
                interval: 4000
            };

            // accordion panels
            $scope.accordionPanels = {
                isopen1: true
            };

            // tabs
            $scope.tabs = {
                relatedProducts: {
                    active: true
                },
                accessories    : {
                    active: false
                }
            };

            function setDefaults() {
                product.optionSelection = { images: 'default' };
                product.image = product.images.default[0];
                cartItem.options = cartItem.options || {};
            }

            vnApi.Product().get({code: $routeParams.slug }).$promise
                .then(function (response) {
                    $scope.product = response.data;

                    var fullUrl = $location.absUrl(),
                        pageTitle = $scope.seo.metaTagTitle;

                    // Sharing
                    $scope.product.sharing = {
                        facebook  : 'http://www.facebook.com/sharer.php?u=' + fullUrl + '/',
                        twitter   : 'http://twitter.com/share?url=' + fullUrl + '&amp;text=' + pageTitle,
                        tumblr    : 'http://www.tumblr.com/share/link?url=' + fullUrl + '&amp;name=' + pageTitle,
                        googlePlus: 'https://plus.google.com/share?url=' + fullUrl
                    };

                    product = $scope.product;
                    cartItem = $scope.cartItem = product.cartItem;

                    $scope.isInDesktopMode = $rootScope.isInDesktopMode;

                    angular.extend($scope.seo, product.seo);

                    setDefaults();

                })
                .then(function () {

                    // According to Kevin we should query only the top category
                    var categoryIds = product.categories[0].id;

                    // related products
                    vnApi.Product().get({ categoryIds: categoryIds, pageNumber: 1, pageSize: 4 }).$promise
                        .then(function (response) {
                            $scope.relatedProducts = response.data;
                        });

                    // accessories
                    vnApi.Product().get({ accessoriesOf: product.code, pageNumber: 1, pageSize: 4 }).$promise
                        .then(function (response) {
                            $scope.accessories = response.data;
                        });
                });

            $scope.$on('$stateChangeSuccess', function () {
                $location.hash('top');
                $anchorScroll();
                $location.hash('');
            });

//            $scope.sceDescriptions = angular.copy(product.descriptions);  // TODO: ???

            $scope.$watch('product.optionSelection', function (selection, oldSelection) {

                function setAvailabilityMessage() {
//                    var message = product.optionAvailabilityMessages[selection.state];
//                    if (message) {
//                        $scope.availabilityMessage = message.replace('{{available}}', selection.available);
//                    } else {
//                        delete $scope.availabilityMessage;
//                    }
                }

                function setSKU() {
                    var sku = selection.sku;
                    if (sku !== null && sku !== undefined) {
                        cartItem.sku = sku;
                    } else {
                        delete cartItem.sku;
                    }
                }

                function setQuantity() {
                    if (!cartItem.hasOwnProperty('sku')) {
                        cartItem.quantity = 0;
                        selection.available = 0;
                        return;
                    }
                    if (selection.available < cartItem.quantity) {
                        cartItem.quantity = selection.available;
                    }
                    if (cartItem.quantity === 0 && selection.available > 0) {
                        cartItem.quantity = 1;
                    }
                    selection.available -= cartItem.quantity;
                }

                function setImage() {
                    if (oldSelection === undefined || selection.images !== oldSelection.images) {
                        product.image = product.images[selection.images][0];
                    }
                }

                if (selection === undefined) {
                    return;
                }

                setAvailabilityMessage();
                setSKU();
                setQuantity();
                setImage();
            });

            // Reviews
            vnApi.Review().get({ code: $routeParams.slug }).$promise
                .then(function (response) {
                    $scope.ratingsAndReviews = response;
                });

            function modifyQuantity(amount) {
                cartItem.quantity += amount;
                var selection = product.optionSelection;
                if (selection) {
                    selection.available -= amount;
                }
            }

            $scope.decrementQty = function () {
                modifyQuantity(-1);
            };

            $scope.incrementQty = function () {
                modifyQuantity(1);
            };


            // Add to Cart
            $scope.isAddToCartEnabled = false;

//            $scope.$watch('cartItem.sku', function(sku) {
//                $scope.isAddToCartEnabled = !!sku;
//            });

//            $scope.addToCart = function () {
//                $scope.isAddToCartEnabled = false;
//                $rootScope.$emit('ADD_TO_CART', cartItem);
//            };

//            $rootScope.$on('ITEM_ADDED_TO_CART', function() {
//                $scope.isAddToCartEnabled = true;
//            });
        }]);
