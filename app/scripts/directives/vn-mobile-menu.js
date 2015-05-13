/**
 * @ngdoc directive
 * @name Volusion.toolboxCommon.directive:vnMobileMenu
 * @description
 * # vnMobileMenu
 */

angular.module('Volusion.controllers')
	.directive('vnMobileMenu', ['$rootScope', function ($rootScope) {

		'use strict';

		return {
			restrict   : 'A',
			templateUrl: 'views/partials/mobile-menu.html',
			link : function postLink() {

				$rootScope.openMobileMenu = function(){
					if($rootScope.isCartOpen){
						$rootScope.closeCart();
					}
					angular.element('body').addClass('mobile-menu-active');
					$rootScope.isMobileMenuOpen = true;
					$rootScope.$emit('mobile-menu-open');
				};
				$rootScope.closeMobileMenu = function(){
					angular.element('body').removeClass('mobile-menu-active');
					$rootScope.isMobileMenuOpen = false;
					$rootScope.$emit('mobile-menu-closed');
				};
				$rootScope.toggleMobileMenu = function(){
					if($rootScope.isMobileMenuOpen){
						$rootScope.closeMobileMenu();
					}
					else{
						$rootScope.openMobileMenu();
					}
				};
				$rootScope.$on('device.desktop', function() {
					$rootScope.closeMobileMenu();
				});
			}
		};
	}]
);
