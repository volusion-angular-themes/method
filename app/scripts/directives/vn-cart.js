/**
 * @ngdoc directive
 * @name volusionMethodThemeApp.directive:vnScrollTop
 * @description
 * # vnScrollTop
 */

angular.module('Volusion.controllers')
	.directive('vnShoppingCart', ['$rootScope', function ($rootScope) {

		'use strict';

		return {
			restrict   : 'A',
			controller: 'ShoppingCartCtrl',
			link : function postLink($scope) {

				var cart = $('.th-cart'),
				    cartHeader = $('.th-cart__header'),
				    cartFooter = $('.th-cart__footer'),
				    cartBody = $('.th-cart__body');

				$rootScope.openCart = function () {
					$rootScope.isCartOpen = true;
					cart.toggleClass('th-cart--active');
					$scope.setBodyHeight( cartFooter.height() );
				};
				$rootScope.closeCart = function () {
					$rootScope.isCartOpen = false;
					cart.toggleClass('th-cart--active');
				};
				$scope.exitCartState = function () {
					history.back();
				};
				$scope.setBodyHeight = function (footerHeight) {
					cartBody.css({
						'height': 'calc(100% - ' + (footerHeight + cartHeader.height() + $('.th-cart__brand').height()) + 'px)',
						'margin-top': cartHeader.height() + 'px'
					});
				};
				$scope.$watch(
					function () {
						return cartFooter.height();
					},
					function (newValue) {
						$scope.setBodyHeight( newValue );
					}
				);	
				$scope.$on('cartUpdated', function() {
					$scope.setBodyHeight( cartFooter.height() );
				});
			}
		};
	}]
);