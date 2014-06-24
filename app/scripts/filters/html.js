'use strict';

angular.module('volusion.filters').filter('html', [
  '$sce',
  function($sce) {
    return  function(content) {
      return $sce.trustAsHtml(content);
    };
  }
]);
