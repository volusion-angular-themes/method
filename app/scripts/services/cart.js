/*global angular */

/**
 * @ngdoc service
 * @name methodApp.cart
 * @description
 * # cart
 * Service in the methodApp.
 */
angular.module('Volusion.services')
	.service('Cart', ['vnApi', 'AppConfig',
		function (vnApi, AppConfig) {

			'use strict';

			var cart = {};

			function init() {

				// TODO: get cartId from Config
				// config.checkout.cartId
				//
				vnApi.Cart({ cartId: AppConfig.getCheckoutCartId() }).get().$promise
					.then(function (response) {
						cart = response.data;
					});
			}

			function getCart() {
				return cart;
			}

			function saveCart(cartItem) {
				return vnApi.Cart().save({cartId: cart.id}, cartItem).$promise
					.then(function (response) {
						cart = response.data;
						return cart;
					});
			}

			return {
				init    : init,
				getCart : getCart,
				saveCart: saveCart
			};
		}]);
