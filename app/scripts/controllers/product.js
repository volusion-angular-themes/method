/*global angular */

angular.module('Volusion.controllers')
    .controller('ProductCtrl', ['$rootScope', '$scope', 'vnApi', '$location', '$routeParams', '$anchorScroll', /*'Cart', 'Config',*/
        function ($rootScope, $scope, vnApi, $location, $routeParams, $anchorScroll) { //}, Cart, Config) {

            'use strict';

            var product = {},
                cartItem = {};
//                cart = Cart.getCart(),
//                cartId;

//            cartId = cart && cart.id;
//            if (cartId === undefined) {
////                cartId = $scope.config.checkout.cartId;
//                cartId = Config.getCheckoutCartId();
//            }

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

            vnApi.Product().get({slug: $routeParams.slug }).$promise
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

//            TODO: Fix the html related to no reviews 
            $scope.$watch('product', function() {
                vnApi.Review().get({ code: product.code }).$promise
                    .then(function (response) {
                        console.log('what is our product? ', product);
                        $scope.ratingsAndReviews = response;
                    });
            });

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

            // Reviews //TODO: replace hardcoded 'ah-chairbamboo' with $scope.product.code after it's resolved
//            vnApi.Review().get({ code: 'ah-chairbamboo' }).$promise
//            vnApi.Review().get({ code: product.code }).$promise
//                .then(function (response) {
//                    console.log('what is our product? ', product);
//                    $scope.ratingsAndReviews = response;
//                });

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
            $scope.addToCart = function () {
//                $rootScope.$emit('ADD_TO_CART', cartItem);
//                Cart.saveCart(cartId, cartItem)
//                    .then(function (response) {
//                        cart = response.data;
//                        cartItem.quantity = 0;
//
//                        modifyQuantity(product.optionSelection.available && 1);
//                    });
            };

//            $rootScope.$on('ITEM_ADDED_TO_CART', function () {
//                var selection = product.optionSelection;
//                modifyQuantity(selection.available && 1);
//            });
        }]);
