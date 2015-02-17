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
				    cartBody = $('.th-cart__body');

				$scope.exitCartState = function () {
					history.back();
				};
				$scope.fixBodyHeight = function () {
					$timeout(function(){
						cartBody.css({
							'height': 'calc(100% - ' + (cartFooter.outerHeight() + cartHeader.outerHeight() + $('.th-cart__brand').outerHeight()) + 'px)',
							'margin-top': cartHeader.outerHeight() + 'px'
						});
					}, 0);
				};
				$scope.promoInputKeypress = function (event) {
					if(event.which === 13){
						event.currentTarget.blur();
						$scope.applyCoupon();
					}
				};
				
				$rootScope.$on('enterCartState', function() {
					cart.toggleClass('th-cart--active');
				});
				$rootScope.$on('exitCartState', function() {
					cart.toggleClass('th-cart--active');
				});
				$rootScope.$on('cartUpdated', function() {
					$scope.fixBodyHeight();
				});
				$rootScope.$on('enterNonDesktop', function() {
					$scope.fixBodyHeight();
				});
				$rootScope.$on('exitNonDesktop', function() {
					$scope.fixBodyHeight();
				});
			}
		};
	}]
);