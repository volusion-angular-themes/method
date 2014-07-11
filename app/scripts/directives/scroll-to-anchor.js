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
						/* jshint unused:false */
						element.bind('click', function (event) {
							$location.hash(attr.scrollToAnchor);
							$anchorScroll();
							$location.hash('');
						});
						/* jshint unused:true */
					};
				}
			};
		}]);
