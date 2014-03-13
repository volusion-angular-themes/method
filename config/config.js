/*global angular: true*/
/*jshint -W109 */
'use strict';
var angular = require('angular');

module.exports = angular.module('services.config', [])
  .constant('config', {
    ENV: @@config
  });
