/*global angular */

angular.module('Volusion.services')
    .provider('Config', function () {

        'use strict';

        // Private variables
        var salutation = 'Hello';

        // Private constructor
        function Greeter() {
            this.greet = function () {
                return salutation;
            };

            // STUB ... TODO: Move this method in funal impementation
            this.getCheckoutCartId = function () {
                return 1;
            };
        }

        // Public API for configuration
        this.setSalutation = function (s) {
            salutation = s;
        };

        // Method for instantiating
        this.$get = function () {
            return new Greeter();
        };
    });

//angular.module('Volusion.services')
//    .provider('config', function () {
//
//        // Private variables
//        var api_url = '/api/v1',// Customer sites will always have access to the api, override this in the config for dev.
//            disable_translations = false,
//            url_prefix = '/:region/:lang-:country',// TODO: Depricate this when new routes solidify
//            region = 'us',
//            lang = 'en',
//            country = 'us';
//
//        // Private constructor
//        function Config() {
//            this.config = function () {
//                return this;
//            }
//        }
//
//        // Public API for configuration
//        this.setApi = function (uriPath) {
//            api_url = uriPath;
//        };
//
//        this.setTranslations = function (bool) {
//            disable_translations = bool;
//        };
//
//        this.setPrefix = function (stringPath) {
//            url_prefix = stringPath;
//        };
//
//        this.setRegion = function (stringRegion) {
//            region = stringRegion;
//        }
//
//        this.setLang = function (stringLang) {
//            lang = stringLang;
//        };
//
//        this.setCountry = function (stringCountry) {
//            country = stringCountry;
//        };
//
//        // Method for instantiating
//        this.$get = function () {
//            return new Config();
//        };
//    });
