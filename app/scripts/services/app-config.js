'use strict';

angular.module('Volusion.services')
	.provider('AppConfig', ['ENV', 'vnDataEndpointProvider', function (ENV, vnDataEndpointProvider) {

		vnDataEndpointProvider.setApiUrl(ENV.apiEndpoint);

		// Private variables
		var apiUrl = ENV.apiEndpoint,
			isLocalEnv = true,              // Boolean - will be set during config
			disableTranslations = false,
			urlPrefix = '',
			region = 'us',
			lang = 'en',
			country = 'us';

		// Private constructor
		function AppConfig() {
			this.AppConfig = function () {
				return this;
			};
		}

		this.getIsLocalEnv = function () {
			return isLocalEnv;
		};

		this.getApiPath = function () {
			return apiUrl;
		};

		this.getTranslations = function () {
			return disableTranslations;
		};

		this.getPrefix = function () {
			return urlPrefix;
		};

		this.getRegion = function () {
			return region;
		};

		this.getLang = function () {
			return lang;
		};

		this.getCountry = function () {
			return country;
		};

		// Public API for configuration
		this.setApiPath = function (uriPath) {
			apiUrl = uriPath;
		};

		this.setIsLocalEnv = function (bool) {
			isLocalEnv = bool;
		};

		this.setTranslations = function (bool) {
			disableTranslations = bool;
		};

		this.setPrefix = function (stringPath) {
			urlPrefix = stringPath;
		};

		this.setRegion = function (stringRegion) {
			region = stringRegion;
		};

		this.setLang = function (stringLang) {
			lang = stringLang;
		};

		this.setCountry = function (stringCountry) {
			country = stringCountry;
		};

		// Method for instantiating
		this.$get = function () {
			return new AppConfig();
		};
	}]);
