angular.module('methodApp')
    .controller('MainCtrl', ['$scope', '$rootScope', 'vnApi',
        function ($scope, $rootScope, vnApi) {
            'use strict';

//            console.log('vnApi', vnApi.Configuration().get());

            $rootScope.seo = {};
//
//            $scope.$on('$stateChangeSuccess', function (event, toState) {
//                if (toState.name === 'i18n') {
//                    $state.go('.home', null, { location: 'replace' });
//                } else if (toState.name === 'i18n.home' && $scope.config) {
//                    $rootScope.seo = angular.extend($rootScope.seo, $scope.config.seo);
//                }
//            });
//
//            console.log('getNav', vnApi.getNav());
            vnApi.Nav({navId: '1'})
                .then(function(response) {
                    $scope.categories = response.data;
                    console.log('category / navs', $scope.categories );
                });
//            this.getMenuItems = function () {
//                // Nav
//                api.navs.get({ navId: 1 }).then(function (response) {
//                    $scope.categories = response.data;
//
//                    // TODO: REMOVE
//                    console.log('Categories: ', response.data);
//                }, function (error) {
//                    console.log('Error: ' + error);
//                });
//            };
//

            // Handle the configuration data
            vnApi.getConfiguration()
                .then(function (response) {
                    $scope.config = response.data;
                    angular.extend($rootScope.seo, $scope.config.seo);
//                    console.log('Configuration', $scope.config);
                });

//            console.log('getCart obj', vnApi.getCart().get());
            vnApi.getCart()
                .then(function(response) {
                    $scope.cart = response.data;
                    console.log('cart data', $scope.cart);
                });

//            this.getMenuItems();
//
//            this.getConfig(this.getCart);
//
//            $rootScope.viewCart = function () {
//                if ($rootScope.isInDesktopMode) {
//                    return '/shoppingcart.asp';
//                } else {
//                    return '/checkout.asp';
//                }
//            };
//
//            // Add to Cart
//            $rootScope.$on('ADD_TO_CART', function (event, args) {
//                var pricing = args.pricing;
//                var cartItem = {
//                    id      : args.id,
//                    code    : args.code,
//                    name    : args.name,
//                    options : args.options,
//                    quantity: args.qty,
//                    pricing : {
//                        unitPrice     : pricing.salePrice > 0 ? pricing.salePrice : pricing.regularPrice,
//                        recurringPrice: pricing.recurringPrice
//                    }
//                };
//
//                api.carts.save({ cartId: $scope.cart.id || $scope.config.checkout.cartId }, cartItem)
//                    .then(function (response) {
//
//                        $scope.cart = response.data;
//                        $rootScope.$emit('ITEM_ADDED_TO_CART');
//
//                    });
//
//            });
        }]);
