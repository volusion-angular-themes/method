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
			link : function postLink($scope) {

				$rootScope.openCart = function () {
					$rootScope.isCartOpen = true;
					$scope.setBodyHeight( $scope.getFooterHeight() );
					$('.th-cart').toggleClass('th-cart--active');
					$('.th-cart-overlay').toggleClass('th-cart-overlay--active');
				};
				$rootScope.closeCart = function () {
					$rootScope.isCartOpen = false;
					$('.th-cart').toggleClass('th-cart--active');
					$('.th-cart-overlay').toggleClass('th-cart-overlay--active');
				};

				$scope.getHeaderHeight = function () {
					return document.querySelector('.th-cart__header').offsetHeight;
				};
				$scope.getBrandHeight = function () {
					var brandDiv = document.querySelector('.th-cart__brand');
					if(brandDiv !== undefined && brandDiv !== null){
						return brandDiv.offsetHeight;
					}
					else{
						return 0;
					}
				};
				$scope.getFooterHeight = function () {
					return document.querySelector('.th-cart__footer').offsetHeight;
				};
				$scope.setBodyHeight = function (footerHeight) {
					var scrollArea = document.querySelector('.th-cart__scroll-area');
					scrollArea.style.height = 'calc(100% - ' + (footerHeight + $scope.getHeaderHeight() + $scope.getBrandHeight()) + 'px)';
					scrollArea.style.marginTop = $scope.getHeaderHeight() + 'px';
				};

				$scope.$watch(
					function () {
						return $scope.getFooterHeight();
					},
					function (newValue) {
						$scope.setBodyHeight(newValue);
					}
				);

			}
		};
	}]
);