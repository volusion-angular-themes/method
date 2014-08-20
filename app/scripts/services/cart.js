'use strict';

/**
 * @ngdoc service
 * @name methodApp.cart
 * @description
 * # cart
 * Service in the methodApp.
 */
angular.module('Volusion.services')
	.service('Cart', ['vnApi',
		function (vnApi) {

			var cart = {};

			function init() {

				// Initial cartId is empty
				vnApi.Cart({ cartId: '' }).get().$promise
					.then(function (response) {
						cart = response.data;
					});
			}

			function getCart() {
				return cart;
			}

			function getCartItemsCount() {
				if (cart === undefined || cart.totals === undefined) {
					return 0;
				}

				return cart.totals.qty;
			}

			function saveCart(cartItem) {
				return vnApi.Cart().save({cartId: cart.id}, cartItem).$promise
					.then(function (response) {
						cart = response.data;
						return cart;
					});
			}

			return {
				init             : init,
				getCart          : getCart,
				getCartItemsCount: getCartItemsCount,
				saveCart         : saveCart
			};
		}]);
