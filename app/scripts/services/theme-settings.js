'use strict';

/**
 * @ngdoc service
 * @name methodApp.themeSettings
 * @description
 * # themeSettings
 * Service in the methodApp.
 */
angular.module('Volusion.services')
	.service('themeSettings', ['vnApi',
		function(vnApi) {

			var themeSettings = {};

			function init() {

				vnApi.ThemeSettings().get().$promise
					.then(function(response) {
						themeSettings = response;
					});
			}

			function getThemeSettings() {
				return themeSettings;
			}

			return {
				init: init,
				getThemeSettings: getThemeSettings
			};
		}
	]);
