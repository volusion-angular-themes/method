/* global angular: true */
'use strict';

var angular = require('angular');

module.exports = angular.module('vnMetaTags', [])
  .directive('vnMetaTags', require('./src/meta-tags.directive.js'));
