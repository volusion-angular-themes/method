/* global angular: true */
'use strict';

var angular = require('angular');

module.exports = angular.module('vn-bem', [])
  .directive('vnBlock', require('./block.directive.js'))
  .directive('vnElement', require('./element.directive.js'))
  .controller('BlockCtrl', require('./block.controller.js'))
  .factory('bem', require('./bem.service.js'));
