'use strict';

angular.module('volusion.services').factory('tokenGenerator', [function(){
  return {
    getCacheBustingToken: function() {
      var cacheBustingToken = (new Date()).valueOf();
      return { '_':  cacheBustingToken };
    }
  };
}]);
