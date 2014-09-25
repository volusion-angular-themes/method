/**
 * @ngdoc directive
 * @name volusionMethodThemeApp.directive:vnScrollTop
 * @description
 * # vnScrollTop
 */

angular.module('Volusion.controllers')
	.directive('vnScrollTop', ['$rootScope', function ($rootScope) {

		'use strict';

		return {
			restrict: 'A',
			scope   : {},
			link    : function postLink(scope, element) {
				$rootScope.$on('vnScroll.cart', function () {
					element[0].scrollTop = 0;
				});
			}
		};
	}]);
