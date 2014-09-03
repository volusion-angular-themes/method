angular.module('Volusion.services')
	.provider('AppConfig', ['ENV', 'vnDataEndpointProvider', function (ENV, vnDataEndpointProvider) {

		'use strict';

		var apiHost = ENV.host,
			apiUrl = ENV.host + ENV.apiEndpoint,
			country = 'us',
			disableTranslations = false,
			isLocalEnv = (ENV.host === '') ? false : true,
			lang = 'en',
			region = 'us',
			urlPrefix = '';

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

		this.getApiPath = function () {
			return apiUrl;
		};

		this.getCountry = function () {
			return country;
		};

		this.getIsLocalEnv = function () {
			return isLocalEnv;
		};

		this.getLang = function () {
			return lang;
		};

		this.getPrefix = function () {
			return urlPrefix;
		};

		this.getRegion = function () {
			return region;
		};

		this.getTranslations = function () {
			return disableTranslations;
		};

		this.setApiPath = function (uriPath) {
			apiUrl = uriPath;
		};

		this.setCountry = function (stringCountry) {
			country = stringCountry;
		};

		this.setIsLocalEnv = function (bool) {
			isLocalEnv = bool;
		};

		this.setLang = function (stringLang) {
			lang = stringLang;
		};

		this.setPrefix = function (stringPath) {
			urlPrefix = stringPath;
		};

		this.setRegion = function (stringRegion) {
			region = stringRegion;
		};

		this.setTranslations = function (bool) {
			disableTranslations = bool;
		};

		// Method for instantiating
		this.$get = function () {
			return new AppConfig();
		};
	}]);
