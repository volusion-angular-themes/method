/* global angular: true */
'use strict';

var angular = require('angular');

module.exports = angular.module('vnProductOption', [
    require('./src/bower_components/vn-bem').name,
    require('./src/bower_components/vn-labeled-radio').name
  ])
  .run(['$templateCache', function($templateCache) {
    $templateCache.put('product-option.html', require('./src/product-option.html'));
    $templateCache.put('radios.html', require('./src/radios.html'));
    $templateCache.put('checkboxes.html', require('./src/checkboxes.html'));
    $templateCache.put('select.html', require('./src/select.html'));
    $templateCache.put('text.html', require('./src/text.html'));
    $templateCache.put('content.html', require('./src/content.html'));
  }])
  .controller('ProductOptionCtrl', require('./src/product-option.controller'))
  .directive('vnProductOption', require('./src/product-option.directive'));
