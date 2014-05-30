'use strict';

angular.module('volusion.filters').filter('seoFriendly', [function seoFriendly() {
  return function(input) {
    var words = input.match(/[0-9a-z]+/gi);
    return words ? words.join('-') : '';
  };
}]);
