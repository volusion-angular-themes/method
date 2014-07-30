'use strict';

/**
 * @ngdoc service
 * @name methodApp.themeSettings
 * @description
 * # themeSettings
 * Service in the methodApp.
 */
angular.module('Volusion.services')
	.service('themeSettings', ['$q', 'vnApi',
		function ($q, vnApi) {

			var themeSettings = {};

			function init() {
				vnApi.ThemeSettings().get().$promise
					.then(function (response) {
						themeSettings = response;
					});
			}

			function getThemeSettings() {
				var deferred = $q.defer();

				vnApi.ThemeSettings().get().$promise
					.then(function (response) {
						deferred.resolve(response);
						themeSettings = response;
					});

				return deferred.promise;
			}

			function getPageSize() {
				return themeSettings.itemsPerPage || 8;
			}

			return {
				init            : init,
				getThemeSettings: getThemeSettings,
				getPageSize     : getPageSize
			};
		}]);
