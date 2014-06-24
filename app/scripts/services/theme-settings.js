/*global angular */

/**
 * @ngdoc service
 * @name volusionMethodThemeApp.themeSettings
 * @description
 * # themeSettings
 * Service in the volusionMethodThemeApp.
 */
angular.module('Volusion.services')
    .service('themeSettings', ['vnApi',
        function ThemeSettings(vnApi) {

            'use strict';

            var themeSettings = {};

            function init() {

                vnApi.ThemeSettings().get().$promise
                    .then(function (response) {
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
        }]);
