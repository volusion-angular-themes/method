/*global angular */

/**
 * @ngdoc service
 * @name methodApp.cart
 * @description
 * # cart
 * Service in the methodApp.
 */
angular.module('Volusion.services')
    .service('Cart', ['$q', 'vnApi', 'Config',
        function ($q, vnApi, Config) {

            'use strict';

            var cart = {};

            function init() {

                // TODO: get cartId from Config
                // config.checkout.cartId
                //
                vnApi.Cart({ cartId: Config.getCheckoutCartId() }).get().$promise
                    .then(function (response) {
                        cart = response;
                    });
            }

            function getCart() {
                return cart;
            }

            function saveCart(cartId, cartItem) {
                return vnApi.Cart().save({cartId: cartId}, cartItem).$promise
                    .then(function (response) {
                        return response.data;
                    });
            }

            return {
                init    : init,
                getCart : getCart,
                saveCart: saveCart
            };
        }]);
