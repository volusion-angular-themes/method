'use strict';

/**
 * @ngdoc filter
 * @name methodApp.filter:legacyLinkify
 * @function
 * @description
 * # legacyLinkify
 * Filter in the methodApp.
 */
angular.module('Volusion.filters')
	.filter('legacyLinkify',
		function() {

			return function(html) {
				var $div = angular.element('<div/>').html(html);
				angular.forEach($div.find('a'), function(a) {
					var $a = angular.element(a);
					$a.attr('target', $a.attr('target') || '_self');
				});
				return $div.html();
			};
		});
