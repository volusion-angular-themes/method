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

module.exports = ApiEndpointConfig;
