'use strict';

angular.module('Volusion.services')
	.provider('AppConfig', ['ENV', 'vnDataEndpointProvider', function (ENV, vnDataEndpointProvider) {

		// Private variables
		var apiHost = ENV.host,
			apiUrl = ENV.host + ENV.apiEndpoint,
			isLocalEnv = (ENV.host === '') ? false : true,              // if host is empty assume is PROD (use relative path)
			disableTranslations = false,
			urlPrefix = '',
			region = 'us',
			lang = 'en',
			country = 'us';

		vnDataEndpointProvider.setApiUrl(apiUrl);

		// Private constructor
		function AppConfig() {
			this.AppConfig = function () {
				return this;
			};

			this.getApiHost = function () {
				return apiHost;
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
