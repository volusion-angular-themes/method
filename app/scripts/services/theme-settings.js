angular.module('Volusion.services')
	.service('themeSettings', ['$q', 'vnApi',
		function ($q, vnApi) {

			'use strict';

			var themeSettings = {};

			function hasEmptySettings(obj) {
				for (var key in obj) {
					if (obj.hasOwnProperty(key)) {
						return false;
					}
				}
				return true;
			}

			function init() {
				if (hasEmptySettings(themeSettings)) {
					vnApi.ThemeSettings().get().$promise
						.then(function (response) {
							// Remember themeSettings is a $resource!
							themeSettings = response;
						});
				}
			}

			function getPageSize() {
				return themeSettings.itemsPerPage || 8;
			}

			function getThemeSettings() {
				var deferred = $q.defer();

				if (hasEmptySettings(themeSettings)) {
					vnApi.ThemeSettings().get().$promise
						.then(function (response) {
							deferred.resolve(response);
							themeSettings = response;
						});
				} else {
					deferred.resolve(themeSettings);
				}

				return deferred.promise;
			}

			return {
				init            : init,
				getThemeSettings: getThemeSettings,
				getPageSize     : getPageSize
			};
		}]);
