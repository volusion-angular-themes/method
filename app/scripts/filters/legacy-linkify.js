angular.module('Volusion.filters')
	.filter('legacyLinkify',
		function() {

			'use strict';

			return function(html) {
				var $div = angular.element('<div/>').html(html);
				angular.forEach($div.find('a'), function(a) {
					var $a = angular.element(a);
					$a.attr('target', $a.attr('target') || '_self');
				});
				return $div.html();
			};
		});
