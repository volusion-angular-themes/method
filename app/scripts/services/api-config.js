'use strict';

/**
 * Configuration object for an api endpoint.
 * @constructor
 */
var ApiEndpointConfig = function() {
  /**
   * Map of actions for the endpoint, keyed by action name. An action has a HTTP
   * method (GET, POST, etc.) as well as an optional set of default parameters.
   * @type {Object.<string, {method: string, params: Object}>}
   */
  this.actions = {};

  /** The default actions defined for every endpoint. */
  var defaultActions = {
    'GET': 'get',
    'PUT': 'update',
    'POST': 'save',
    'PATCH': 'patch',
    'DELETE': 'remove'
  };

  // Add the default actions to this endpoint.
  var self = this;
  angular.forEach(defaultActions, function(alias, method) {
    self.addHttpAction(method, alias);
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
ApiEndpointConfig.prototype.addHttpAction = function(method, name, params) {
  this.actions[name] = {method: method.toUpperCase(), params: params};
};

/******************************************************************************/

module.exports = ApiEndpointConfig;
