'use strict';

/**
 * @ngdoc service
 * @name themeMethod.siteConfig
 * @description
 * # siteConfig
 * Service in the themeMethod.
 */
angular.module('Volusion.services')
	.service('SiteConfig', ['vnApi', '$q',
		function (vnApi, $q) {

			var siteConfig = {};

			siteConfig.getConfig = function() {
				var deferred = $q.defer();
				vnApi.Configuration().get().$promise
					.then(function(response) {
						deferred.resolve(response);
					});
				return deferred.promise;
			};

			return siteConfig;
		}]);
