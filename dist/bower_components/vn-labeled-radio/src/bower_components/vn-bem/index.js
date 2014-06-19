/* global angular: true */
'use strict';

var angular = require('angular');

module.exports = angular.module('vn-bem', [])
  .directive('vnBlock', require('./src/block.directive'))
  .directive('vnElement', require('./src/element.directive'))
  .controller('BlockCtrl', require('./src/block.controller'))
  .factory('bem', require('./src/bem.service'));
