/*global angular */

angular.module('Volusion.controllers')
    .controller('ProductCtrl', ['$rootScope', '$scope', 'vnApi', '$location', '$routeParams', '$anchorScroll', 'Cart', 'Config',
        function ($rootScope, $scope, vnApi, $location, $routeParams, $anchorScroll, Cart, Config) {

            'use strict';

            var product = {},
                cartItem = {},
                cart = Cart.getCart(),
                cartId;

            cartId = cart && cart.id;
            if (cartId === undefined) {
//                cartId = $scope.config.checkout.cartId;
                cartId = Config.getCheckoutCartId();
            }

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

//                    $scope.product.descriptions.detail = 'Shred some waves!  These stylish board shorts use the latest stretch material technology for optimal performance.<br /><br /><span style="font-weight: bold;">Size Chart:</span><br /><br />' +
//
//                        '<table style="width: 414px; height: 74px; text-align: left; margin-left: auto; margin-right: auto;" class="box">' +
//                        '<tbody>' +
//                        '<tr align="center">' +
//                            '<td style="background-color:#939186; color: #fff;" class="first_title">Australia</td>' +
//                            '<td style="background-color:#939186; color:#fff;">28W</td>' +
//                            '<td style="background-color:#939186; color:#fff;">30W</td>' +
//                            '<td style="background-color:#939186; color:#fff;">31W</td>' +
//                            '<td style="background-color:#939186; color:#fff;">32W</td>' +
//                            '<td style="background-color:#939186; color:#fff;">33W</td>' +
//                            '<td style="background-color:#939186; color:#fff;">34W</td>' +
//                            '<td style="background-color:#939186; color:#fff;">36W</td>' +
//                            '<td style="background-color:#939186; color:#fff;">38W</td>' +
//                            '<td style="background-color:#939186; color:#fff;">40W</td>' +
//                            '<td style="background-color:#939186; color:#fff;">41W</td>' +
//                        '</tr>' +
//                        '<tr align="center">' +
//                            '<td style="background-color:#7e7c73;color: #fff;" class="first_title">United States</td>' +
//                            '<td style="background-color: #7e7c73;color: #fff;">28W</td>' +
//                            '<td style="background-color: #7e7c73;color: #fff;">30W</td>' +
//                            '<td style="background-color: #7e7c73;color: #fff;">31W</td>' +
//                            '<td style="background-color: #7e7c73;color: #fff;">32W</td>' +
//
//                            '<td style="background-color: #7e7c73;color: #fff;">33W</td>' +
//                            '<td style="background-color: #7e7c73;color: #fff;">34W</td>' +
//                            '<td style="background-color: #7e7c73;color: #fff;">36W</td>' +
//                            '<td style="background-color: #7e7c73;color: #fff;">38W</td>' +
//                            '<td style="background-color: #7e7c73;color: #fff;">40W</td>' +
//                        '</tr>' +
//                        '<tr class="last">' +
//                            '<td style="background-color: #5c5a53; color: #fff; text-align: center;" class="first_title">Europe</td>' +
//                            '<td style="background-color: #5c5a53; color: #fff; text-align: center;">36W</td>' +
//                            '<td style="background-color: #5c5a53; color: #fff; text-align: center;">38W</td>' +
//                            '<td style="background-color: #5c5a53; color: #fff; text-align: center;">39W</td>' +
//                            '<td style="background-color: #5c5a53; color: #fff; text-align: center;">40.5W</td>' +
//
//                            '<td style="background-color: #5c5a53; color: #fff; text-align: center;">42W</td>' +
//                            '<td style="background-color: #5c5a53; color: #fff; text-align: center;">43W</td>' +
//                            '<td style="background-color: #5c5a53; color: #fff; text-align: center;">46W</td>' +
//                            '<td style="background-color: #5c5a53; color: #fff; text-align: center;">48W</td>' +
//                            '<td style="background-color: #5c5a53; color: #fff; text-align: center;">51W</td>' +
//                        '</tr>' +
//                        '</tbody></table>';

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

            $rootScope.$on('VN_PRODUCT_SELECTED', function(event, selection) {
                selection.product.optionSelection = selection;
            });

//            TODO: Fix the html related to no reviews
            $scope.$watch('product', function() {
                if (product.code) {
                    vnApi.Review().get({ code: product.code }).$promise
                        .then(function (response) {
                            $scope.ratingsAndReviews = response;
                        });
                }
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
                    }
                }

                function setQuantity() {
                    if (!selection.isValid) {
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

                $scope.isAddToCartButtonEnabled = selection.isValid && cartItem.quantity > 0;
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
                Cart.saveCart(cartId, cartItem)
                    .then(function (response) {
                        cart = response.data;
                        cartItem.quantity = 0;

                        modifyQuantity(product.optionSelection.available && 1);
                    });
            };

//            $rootScope.$on('ITEM_ADDED_TO_CART', function () {
//                var selection = product.optionSelection;
//                modifyQuantity(selection.available && 1);
//            });
        }]);
