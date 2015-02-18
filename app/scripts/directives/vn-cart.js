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

				$scope.showPromoList = false;

				var cart = $('.th-cart'),
				    cartHeader = $('.th-cart__header'),
				    cartFooter = $('.th-cart__footer'),
				    cartBody = $('.th-cart__body');

				$scope.fixBodyHeight = function (timeout) {
					timeout = (timeout === undefined) ? 0 : timeout;
					$timeout(function(){
						cartBody.css({
							'height': 'calc(100% - ' + (cartFooter.outerHeight() + cartHeader.outerHeight() + $('.th-cart__brand').outerHeight()) + 'px)',
							'margin-top': cartHeader.outerHeight() + 'px'
						});
					}, timeout);
				};
				$scope.promoInputKeypress = function (event) {
					if(event.which === 13){
						event.currentTarget.blur();
						$scope.applyCoupon();
					}
				};
				$scope.togglePromoList = function (visibility) {
					$scope.showPromoList = (visibility !== undefined) ? visibility : !$scope.showPromoList;
					$timeout(function(){
						$scope.fixBodyHeight();
					}, 275);
				};
				$scope.toggleApplyBtn = function (visibility) {
					if(visibility === false){
						// 0 timeout allows click event happen on mobile devices before hiding
						$timeout(function(){
							$scope.coupon.showApply = !$scope.coupon.showApply;
							$scope.togglePromoKeyboardFix();
						}, 0);
					}
					else if(visibility === true){
						$scope.coupon.showApply = true;
						$scope.togglePromoKeyboardFix();
					}
					else{
						$scope.coupon.showApply = (visibility !== undefined) ? visibility : !$scope.coupon.showApply;
						$scope.togglePromoKeyboardFix();
					}
					$scope.fixBodyHeight();
				};
				$scope.toggleKeyboardFix = function () {
					cartFooter.toggleClass('th-cart__footer--keyboard-fix');
					$scope.fixBodyHeight();
				};
				$scope.togglePromoKeyboardFix = function () {
					cartFooter.toggleClass('th-cart__footer--promo-keyboard-fix');
					$scope.fixBodyHeight();
				};

				//Fix for keyboard on mobile devices
				cartBody.on('focus', 'input.form-control, textarea', function(){
					$scope.toggleKeyboardFix();
				}).on('blur', 'input.form-control, textarea', function(){
					$scope.toggleKeyboardFix();
				});
				
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