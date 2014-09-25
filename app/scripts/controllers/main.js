angular.module('Volusion.controllers')
	.controller('MainCtrl', ['$scope', '$rootScope', '$location', '$window', '$timeout', 'vnApi', 'themeSettings', 'vnSiteConfig', 'vnImagePreloader',
		function ($scope, $rootScope, $location, $window, $timeout, vnApi, themeSettings, vnSiteConfig, vnImagePreloader) {

			'use strict';

			$rootScope.seo = {};

			vnSiteConfig.getConfig().then(function (response) {
				$scope.config = response.data;
			});

			themeSettings.getThemeSettings().then(function(response) {
				$scope.themeSettings = response;

				var imagesToPreload  = [];

				angular.forEach($scope.themeSettings.pages.home.slider.slides, function (slide) {
					imagesToPreload.push(slide.imageUrl);
				});

				vnImagePreloader.preloadImages(imagesToPreload);
			});

		}]);
