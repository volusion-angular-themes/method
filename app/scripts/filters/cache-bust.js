/**
 * @ngdoc filter
 * @name volusionMethodThemeApp.filter:cacheBust
 * @function
 * @description
 * # cacheBust
 * Filter in the methodApp.
 */

angular.module('Volusion.filters').filter('cacheBust',
	[ 'tokenGenerator',
		function (tokenGenerator) {

			'use strict';

			function appendTokenToUrl(url) {
				if (!url || !url.trim()) {
					return url;
				}

				var separator = (url.indexOf('?') > -1) ? '&' : '?';
				return url + separator + '_=' + tokenGenerator.getCacheBustingToken();
			}

			return function (url) {
				return appendTokenToUrl(url);
			};
		}
	]);
