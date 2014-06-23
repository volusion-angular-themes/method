'use strict';
/**
 * Configuration object for an api endpoint.
 * @constructor
 */
var ApiEndpointConfig = function(customActions) {

  /** The default actions defined for every endpoint. */
  var defaultActions = {
    'delete': {method:'DELETE'},
    'get':    {method:'GET'},
    'patch':  {method:'PATCH'},
    'query':  {method:'GET', isArray:true},
    'remove': {method:'DELETE'},
    'save':   {method:'POST'},
    'update': {method:'PUT'}
  };

  /**
   * Map of actions for the endpoint, keyed by action name. An action has a HTTP
   * method (GET, POST, etc.) as well as an optional set of default parameters.
   * @type {Object.<string, {method: string, params: Object}>}
   */
  this.actions = angular.extend(defaultActions, customActions || {});

  // Add the default actions to this endpoint.
  var self = this;
  angular.forEach(self.actions, function(value, key) {
    self.addHttpAction(key, value);
  });
};

/**
 * Set the route for this endpoint. This is relative to the server's base route.
 * @param {string} route
 * @return {app.ApiEndpointConfig}
 */
ApiEndpointConfig.prototype.route = function(route) {
  this.route = route;
  return this;
};

/**
 * Set the route for this endpoint. This is relative to the server's base route.
 * @param {function(): app.ApiModel} model
 * @return {app.ApiEndpointConfig}
 */
ApiEndpointConfig.prototype.model = function(model) {
  this.model = model;
  return this;
};

/**
 * Adds an action to the endpoint.
 * @param {string} method The HTTP method for the action.
 * @param {string} name The name of the action.
 * @param {Object=} params The default parameters for the action.
 */
ApiEndpointConfig.prototype.addHttpAction = function(name, action) {
  this.actions[name] = action;
};

/******************************************************************************/

/**
 * An api endpoint.
 *
 * @constructor
 * @param {string} baseRoute The server api's base route.
 * @param {app.ApiEndpointConfig} endpointConfig Configuration object for the
 *     endpoint.
 * @param {!Function} $resource The angular $resource service.
 */
var ApiEndpoint = function(baseRoute, endpointConfig, $resource) {
  this.config = endpointConfig;
  this.resource = $resource(baseRoute + endpointConfig.route, {},
    endpointConfig.actions);

  // Extend this endpoint objects with methods for all of the actions defined
  // in the configuration object. The action performed depends on whether or
  // not there is a model defined in the configuration; when there is a model
  // defined, certain request types must be wrapped in order to apply the
  // pre/post request transformations defined by the model.
  var self = this;
  angular.forEach(endpointConfig.actions, function(action, actionName) {
    var actionMethod = self.request;
    self[actionName] = angular.bind(self, actionMethod, actionName);
  });
};

/**
 * Perform a standard http request.
 *
 * @param {string} action The name of the action.
 * @param {Object=} params The parameters for the request.
 * @param {Object=} data The request data (for PUT / POST requests).
 * @return {angular.$q.Promise} A promise resolved when the http request has
 *     a response.
 */
ApiEndpoint.prototype.request = function(action, params, data) {
  return this.resource[action](params, data).$promise;
};

/******************************************************************************/

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
ApiProvider.prototype.endpoint = function(name, customActions) {
  var endpointConfig = new ApiEndpointConfig(customActions);
  this.endpoints[name] = endpointConfig;
  return endpointConfig;
};

/**
 * Function invoked by angular to get the instance of the api service.
 * @return {Object.<string, app.ApiEndpoint>} The set of all api endpoints.
 */

// Method for instantiating
ApiProvider.prototype.$get = [
  '$resource',
  function(
    $resource) {
    var api = {};

    var self = this;
    angular.forEach(self.endpoints, function(endpointConfig, name) {
      api[name] = new ApiEndpoint(self.baseRoute, endpointConfig, $resource);
    });

    return api;
  }
];

angular.module('volusion.services')
  .provider('api', ApiProvider)
  .config(['apiProvider', 'config', function(apiProvider, config) {
    var customActions = {
      'save': { method: 'POST', headers: { 'vMethod': 'POST'} },
      'update': { method: 'POST', headers: { 'vMethod': 'PUT'} },
    };

    apiProvider.setBaseRoute(config.ENV.API_URL);

    apiProvider.endpoint('config').
      route('/config');
    apiProvider.endpoint('articles').
      route('/articles/:slug');
    apiProvider.endpoint('products').
      route('/products/:code');
    apiProvider.endpoint('reviews').
      route('/products/:code/reviews');
    apiProvider.endpoint('categories').
      route('/categories/:id');
    apiProvider.endpoint('navs').
      route('/navs/:navId');
    apiProvider.endpoint('carts', customActions).
      route('/carts/:cartId');
  }]);
