'use strict';

angular.module('Volusion.services')
	.factory('tokenGenerator', function() {

		function getCacheBustingToken() {
			return { '_': (new Date()).valueOf() };
		}

		return {
			getCacheBustingToken: getCacheBustingToken
		};
	});
