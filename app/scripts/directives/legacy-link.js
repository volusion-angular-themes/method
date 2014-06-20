'use strict';

angular.module('volusion.directives').directive('legacyLink', [
  function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        element.attr({
          href: attrs.legacyLink,
          onclick: 'return !!window.location.assign(this.href)'
        });
      }
    };
  }
]);
