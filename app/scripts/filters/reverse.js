angular.module('Volusion.filters')
	.filter('reverse', function() {

		'use strict';

		return function(items) {
			return (items === undefined) ? null : items.slice().reverse();
		};
	});
