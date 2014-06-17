angular.module('methodApp')
    .controller('MainCtrl', ['$scope', '$rootScope', 'vnApi',
        function ($scope, $rootScope, vnApi) {
            'use strict';

//            console.log('vnApi', vnApi.Configuration().get());

            $rootScope.seo = {};

            $scope.createSubCategoryURI = function(subcat) {
                console.log(subcat);
                return "cats1/c/cats2";
            }

// TODO: refactor the seo state into a directive.
//            $scope.$on('$stateChangeSuccess', function (event, toState) {
//                if (toState.name === 'i18n') {
//                    $state.go('.home', null, { location: 'replace' });
//                } else if (toState.name === 'i18n.home' && $scope.config) {
//                    $rootScope.seo = angular.extend($rootScope.seo, $scope.config.seo);
//                }
//            });
            //this.getMenuItems(); // Is a call to get the categories.Was at bottom but can be prunned
//
//            console.log('getNav', vnApi.getNav());
            vnApi.Nav({navId: '1'})
                .then(function(response) {
                    $scope.categories = response.data;
                });
            // TODO: Remove commented out legacy code
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
                });

//            console.log('getCart obj', vnApi.getCart().get());
            vnApi.getCart()
                .then(function(response) {
                    $scope.cart = response.data;
                });
//
//            this.getConfig(this.getCart);  //TODO Prune this code
//
            // TODO add function for ng-click that does this.
//            $rootScope.viewCart = function () {
//                if ($rootScope.isInDesktopMode) {
//                    return '/shoppingcart.asp';
//                } else {
//                    return '/checkout.asp';
//                }
//            };
//
              // TODO: Refactor the add to cart flow
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
//                    });
//
//            });
        }]);
