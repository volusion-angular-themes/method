/**
 * @ngdoc directive
 * @name methodApp.directive:scrollTo
 * @description
 * # scrollTo
 */

angular.module('Volusion.directives')
	.directive('scrollToAnchor', ['$location', '$anchorScroll',
		function ($location, $anchorScroll) {

			'use strict';

			return {
				restrict: 'AC',
				compile : function () {

					return function (scope, element, attr) {
						element.bind('click', function (event) {
							event.preventDefault();
							$location.hash(attr.scrollToAnchor);
							$anchorScroll();
						});
					};
				}
			};
		}]);
