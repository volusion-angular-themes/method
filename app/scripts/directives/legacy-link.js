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
					element.attr('href', attrs.legacyLink);
					element.on('click', function(e) {
						e.preventDefault();
						$window.location.assign(this.href);
					});
				}
			};
		}
	]);
