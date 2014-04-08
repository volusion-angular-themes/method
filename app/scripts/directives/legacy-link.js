'use strict';

module.exports = ['$window', function($window) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.attr('href', attrs.legacyLink);
      element.on('click', function(e) {
        e.preventDefault();
        $window.location.assign(this.href);
      });
    }
  };
}];
