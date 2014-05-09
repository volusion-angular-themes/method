'use strict';

/**
 * @ngdoc overview
 * @name angulartics.google.analytics
 * Enables analytics support for Google Tag Manager (http://google.com/tagmanager)
 */

module.exports = angular.module('volusion.google.tagmanager', ['angulartics'])
.config(['$analyticsProvider', function($analyticsProvider){

  /**
  * Send content views to the dataLayer
  *
  * @param {string} path Required 'content name' (string) describes the content loaded
  */

  $analyticsProvider.registerPageTrack(function(path){
    var dataLayer = window.dataLayer = window.dataLayer || [];
    dataLayer.push({
      'event': 'theme-engine',
      'content-name': path
    });
  });

  /**
   * Send interactions to the dataLayer, i.e. for event tracking in Google Analytics
   * @name eventTrack
   *
   * @param {string} action Required 'action' (string) associated with the event
   * @param {object} properties Comprised of the mandatory field 'category' (string) and optional  fields 'label' (string), 'value' (integer) and 'noninteraction' (boolean)
   */

  $analyticsProvider.registerEventTrack(function(action, properties){
    var dataLayer = window.dataLayer = window.dataLayer || [];
    dataLayer.push({
      'event': 'interaction',
      'target': properties.category,
      'action': action,
      'target-properties': properties.label,
      'value': properties.value,
      'interaction-type': properties.noninteraction,
      'event-location': properties.location,
      'event-description': properties.description
    });

  });
}]);
