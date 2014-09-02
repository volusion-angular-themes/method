'use strict';

angular.module('Volusion.services')
	.factory('tokenGenerator', function () {

		function getCacheBustingToken() {
			return (new Date()).valueOf();
		}

		return {
			getCacheBustingToken: getCacheBustingToken
		};
	});
