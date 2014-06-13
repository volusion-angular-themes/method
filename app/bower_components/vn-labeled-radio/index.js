/* global angular: true */
'use strict';

var angular = require('angular');

module.exports = angular.module('vn.labeledRadio', [
    require('./src/bower_components/vn-bem').name
  ])
  .run(function($templateCache) {
    $templateCache.put('labeled-radio.html', require('./src/labeled-radio.html'));
  })
  .directive('vnLabeledRadio', require('./src/labeled-radio.directive'));
