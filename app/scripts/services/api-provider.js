'use strict';

var ApiConfig = require('./api-config');
var ApiEndpoint = require('./api-endpoint');

/**
 * Angular provider for configuring and instantiating as api service.
 *
 * @constructor
 */
var ApiProvider = function() {
  this.baseRoute = '';
  this.endpoints = {};
};

/**
 * Sets the base server api route.
 * @param {string} route The base server route.
 */
ApiProvider.prototype.setBaseRoute = function(route) {
  this.baseRoute = route;
};

/**
 * Creates an api endpoint. The endpoint is returned so that configuration of
 * the endpoint can be chained.
 *
 * @param {string} name The name of the endpoint.
 * @return {app.ApiEndpointConfig} The endpoint configuration object.
 */
ApiProvider.prototype.endpoint = function(name) {
  var endpointConfig = new ApiConfig();
  this.endpoints[name] = endpointConfig;
  return endpointConfig;
};

/**
 * Function invoked by angular to get the instance of the api service.
 * @return {Object.<string, app.ApiEndpoint>} The set of all api endpoints.
 */

// Method for instantiating
ApiProvider.prototype.$get = [
  '$injector',
  function(
    $injector) {
    var api = {};

    var self = this;
    angular.forEach(self.endpoints, function(endpointConfig, name) {
      api[name] = $injector.instantiate(ApiEndpoint, {
        baseRoute: self.baseRoute,
        endpointConfig: endpointConfig
      });
    });

    return api;
  }
];

module.exports = ApiProvider;
