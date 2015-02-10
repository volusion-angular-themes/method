/**
 * @ngdoc directive
 * @name volusionMethodThemeApp.directive:vnScrollTop
 * @description
 * # vnScrollTop
 */

angular.module('Volusion.controllers')
	.directive('vnShoppingCart', ['$rootScope', '$timeout', function ($rootScope, $timeout) {

		'use strict';

		return {
			restrict   : 'A',
			controller: 'ShoppingCartCtrl',
			link : function postLink($scope) {

				var cart = $('.th-cart'),
				    cartHeader = $('.th-cart__header'),
				    cartFooter = $('.th-cart__footer'),
				    cartBody = $('.th-cart__body'),
				    cartBrand = $('.th-cart__brand');

				$rootScope.openCart = function () {
					$rootScope.isCartOpen = true;
					cart.toggleClass('th-cart--active');
					$scope.fixBodyHeight();
				};
				$rootScope.closeCart = function () {
					$rootScope.isCartOpen = false;
					cart.toggleClass('th-cart--active');
				};
				$scope.exitCartState = function () {
					history.back();
				};
				$scope.fixBodyHeight = function () {
					$scope.updateCartTimeout = $timeout(function(){
						cartBody.css({
							'height': 'calc(100% - ' + (cartFooter.height() + cartHeader.height() + cartBrand.height()) + 'px)',
							'margin-top': cartHeader.height() + 'px'
						});
					}, 0);
				};
				$scope.$on('cartUpdated', function() {
					$scope.fixBodyHeight();
				});
			}
		};
	}]
);