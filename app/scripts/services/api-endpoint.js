'use strict';

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

module.exports = ApiEndpoint;
