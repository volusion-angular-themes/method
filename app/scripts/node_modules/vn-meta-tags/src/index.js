/* global angular: true */
'use strict';

var angular = require('angular');

module.exports = angular.module('vn.metaTags', [])
  .directive('vnMetaTags', require('./meta-tags.directive.js'));
