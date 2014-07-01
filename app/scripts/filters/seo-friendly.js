'use strict';

/**
 * @ngdoc filter
 * @name methodApp.filter:seoFriendly
 * @function
 * @description
 * # seoFriendly
 * Filter in the methodApp.
 */

angular.module('Volusion.filters')
	.filter('seoFriendly', function seoFriendly() {

		return function(input) {
			var words = input.match(/[0-9a-z]+/gi);
			return words ? words.join('-') : '';
		};
	});
