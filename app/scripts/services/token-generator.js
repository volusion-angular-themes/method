'use strict';

angular.module('Volusion.services')
	.factory('tokenGenerator', function() {

		function getCacheBustingToken() {
//			TODO: The original code returns an object ... why?
//			return { '_':  (new Date()).valueOf() };
			return (new Date()).valueOf();
		}

		return {
			getCacheBustingToken: getCacheBustingToken
		};
	});
