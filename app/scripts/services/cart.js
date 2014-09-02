angular.module('Volusion.services')
	.service('Cart', ['vnApi',
		function (vnApi) {

			'use strict';

			var cart = {};

			function getCart() {
				return cart;
			}

			function getCartItemsCount() {
				if (cart === undefined || cart.totals === undefined) {
					return 0;
				}

				return cart.totals.qty;
			}

			function init() {

				// Initial cartId is empty
				vnApi.Cart({ cartId: '' }).get().$promise
					.then(function (response) {
						cart = response.data;
					});
			}

			function saveCart(cartItem) {
				return vnApi.Cart().save({cartId: cart.id}, cartItem).$promise
					.then(function (response) {
						cart = response.data;
						return cart;
					});
			}

			return {
				getCart          : getCart,
				getCartItemsCount: getCartItemsCount,
				init             : init,
				saveCart         : saveCart
			};
		}]);
