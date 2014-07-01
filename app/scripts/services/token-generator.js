
angular.module('Volusion.services')
	.factory('tokenGenerator', function() {

		'use strict';

		function getCacheBustingToken() {
			return { '_': (new Date()).valueOf() };
		}

		return {
			getCacheBustingToken: getCacheBustingToken
		};
	});
