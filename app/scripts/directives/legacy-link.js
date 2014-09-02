angular.module('Volusion.directives')
	.directive('legacyLink', [
		'$window',
		function ($window) {

			'use strict';

			return {
				restrict: 'AE',
				link    : function (scope, element, attrs) {

					attrs.$observe('legacyLink', function (newValue) {
						element.attr('href', newValue);
					});

					element.on('click', function (e) {
						e.preventDefault();
						$window.location.assign(this.href);
					});
				}
			};
		}
	]);
