angular.module('Volusion.controllers')
	.controller('MainCtrl', ['$scope', '$rootScope', '$location', '$window', '$timeout', 'vnApi', 'themeSettings', 'vnSiteConfig', 'vnImagePreloader', 'vnDevice',
		function ($scope, $rootScope, $location, $window, $timeout, vnApi, themeSettings, vnSiteConfig, vnImagePreloader, vnDevice) {

			'use strict';

			$rootScope.seo = {};

			vnSiteConfig.getConfig().then(function (response) {
				$rootScope.config = response.data;
				$rootScope.config.paypal = {
					url: 'http://166.78.8.98/cgi-bin/aries.cgi?sandbox=1',
					merchantId: 'Paypal has very poor documentation'
				};
				$rootScope.seo = response.data.seo;
				$scope.isPaypalExpressAvailable = $rootScope.config.checkout.isPaypalExpressAvailable;
				$rootScope.$emit('config.updated');
			});

			themeSettings.getThemeSettings().then(function(response) {
				$scope.themeSettings = response;

				var imagesToPreload  = [];

				angular.forEach($scope.themeSettings.pages.home.slider.slides, function (slide) {
					imagesToPreload.push(slide.imageUrl);
				});

				vnImagePreloader.preloadImages(imagesToPreload);
			});

			vnDevice.init({
				breakpoints: {
					phone: 768,
					tablet: 991
				},
				listeners: {
					location: false,
					orientation: true,
					network: false,
					resize: false
				}
			});

		}]);
