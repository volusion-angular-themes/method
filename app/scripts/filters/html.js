/*global angular */

/**
 * @ngdoc filter
 * @name methodApp.filter:html
 * @function
 * @description
 * # html
 * Filter in the Volusion.filters.
 */

angular.module('Volusion.filters')
	.filter('html', [
		'$sce',
		function($sce) {

			'use strict';

			return function(content) {
				return $sce.trustAsHtml(content);
			};
		}
	]);
