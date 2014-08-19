angular.module('app', ['ui.bootstrap','ui.tinymce','angular-ladda'])

	.controller('ThemeSettingsCtrl', ['$scope', '$http', '$location', '$timeout',
		function ($scope, $http, $location, $timeout) {
			'use strict';

			/*
			 Welcome to the main theme settings controller.
			 The data model in themeSettings.json is 100% customizable. Make it your own.
			 Your storefront theme can read the themeSettings.json file in production at www.domain.com/scripts/themeSettings.json
			 And this admin interface can read & write this file via the Volusion API endpoint www.domain.com/api/v1/themes/method/settings
			 */

			//load data on initial page load
			var apiUrl;
			var cssUrl;
			var environment;

			if ($location.absUrl().indexOf('127.0.0.1') >= 0 || $location.absUrl().indexOf('localhost') >= 0) {
				//in local development environment (i.e. grunt serve)
				environment = 'dev';
				apiUrl = '/settings/themeSettings.json';
				cssUrl =  '/styles/main.css';
				$scope.debug = true;
			} else {
				//in production
				environment = 'prod';
				var queryString = $location.search();
				apiUrl = '/api/v1/themes/' + queryString.themeName + '/versions/' + queryString.themeVersion + '/settings';
				cssUrl =  '/themes/' + queryString.themeName + '/versions/' + queryString.themeVersion + '/styles/main.css';
			}
			$http.get(apiUrl)
				.success(function(data) {
					if (environment === 'dev') {
						console.log(data);
						$scope.settings = data;
					} else {
						$scope.settings = data.data; //API in production has a "data{}" wrapper
					}
				});

			//add slide
			$scope.addSlide = function() {
				$scope.settings.pages.home.slider.slides.push({
					headline: '',
					subHeadline: '',
					imageUrl: '',
					linksTo: ''
				});
			};

			$scope.tinymceOptions =	{
				theme: 'modern'
				,menubar: false
				,statusbar: false
				,toolbar: 'undo redo bold italic underline styleselect alignleft aligncenter bullist numlist link unlink image code'
				,plugins: 'link,image,code,autoresize'
				,autoresize_min_height: 50
				,autoresize_max_height: 1000
				,skin_url: 'tinymce-skin'
				,content_css: cssUrl //and this right here folks is why we can't use textAngular
			};

			//handle save button
			$scope.save = function () {
				if (environment === 'dev') {
					//don't save it since we don't have a way to override the themeSettings.json
					$scope.isSaving = true;
					console.log('would be saved if you were in production');
					$timeout(function() {
						$scope.isSaving = false;
					},5000)
				} else {

					//use the Volusion API to overwrite themeSettings.json
					$scope.isSaving = true;
					$http.put(apiUrl, $scope.settings)
						.success(function () {
							$scope.isSaving = false;
							console.log('successfully saved');
						});

				}
			};

		}]);

