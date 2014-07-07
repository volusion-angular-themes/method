'use strict';

/**
 * @ngdoc service
 * @name themeMethod.siteConfig
 * @description
 * # siteConfig
 * Service in the themeMethod.
 */
angular.module('Volusion.services')
	.service('SiteConfig', ['vnApi',
		function SiteConfig(vnApi) {

			var siteConfig = {};

			siteConfig.init = function() {
				vnApi.Configuration().get().$promise
					.then(function(response) {
						siteConfig = response.data;
					});
			};

			return siteConfig;
		}]);
