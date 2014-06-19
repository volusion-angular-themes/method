'use strict';
// http://i-like-robots.github.io/EasyZoom/
angular.module('volusion.directives').directive('easyZoom', [function () {

  var imageHash = {};

  function swapImages(zoomApi) {
    if (imageHash.standardSrc && imageHash.zoomSrc) {
      zoomApi.swap(imageHash.standardSrc, imageHash.zoomSrc);
      imageHash = {};
    }
  }

  return {
    restrict: 'A',
    replace: true,
    template: [
      '<div class="easyzoom" data-ng-class="{ \'easyzoom--adjacent\': ezAdjacent, \'easyzoom--overlay\': ezOverlay }">',
      '<a data-ng-href="{{ezZoomSrc}}">',
      '<img class="img-responsive" data-ng-src="{{ngSrc}}" alt="{{alt}}">',
      '<div class="th-product-view__zoom"></div>',
      '</a>',
      '</div>'
    ].join(''),
    scope: {
      ngSrc: '=',
      ezAdjacent: '=',
      ezOverlay: '=',
      ezZoomSrc: '=',
      alt: '@'
    },
    link: function (scope, element) {
      var easyzoom = element.easyZoom();
      var api = easyzoom.data('easyZoom');

      scope.$watch('ngSrc', function(newValue) {
        imageHash.standardSrc = newValue;
        swapImages(api);
      });

      scope.$watch('ezZoomSrc', function(newValue) {
        imageHash.zoomSrc = newValue;
        swapImages(api);
      });

      scope.$on('$destroy', function() {
        api.teardown();
      });
    }
  };
}]);
