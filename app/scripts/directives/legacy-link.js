'use strict';

/**
 * @ngdoc directive
 * @name methodApp.directive:legacyLink
 * @description
 * # legacyLink
 */
angular.module('Volusion.directives')
	.directive('legacyLink', [
		'$window',
		function($window) {

			return {
				restrict: 'A',
				link: function(scope, element, attrs) {

					attrs.$observe('legacyLink', function(newValue) {
						element.attr('href', newValue);
					});

					element.on('click', function(e) {
						e.preventDefault();
						$window.location.assign(this.href);
					});
				}
			};
		}
	]);
