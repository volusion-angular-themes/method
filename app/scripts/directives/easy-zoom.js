'use strict';
// http://i-like-robots.github.io/EasyZoom/
angular.module('volusion.directives').directive('easyZoom', [function () {
  var imageHash = {};

  var swapImages = function (zoomApi) {
    if (imageHash.mainImage && imageHash.zoomImage) {


      zoomApi.swap(imageHash.mainImage, imageHash.zoomImage);
      imageHash = {};
    }
  };

  return {
    restrict: 'A',
    template: '<a class="zoomImage"><img class="img-responsive" alt=""></a><a href="#" class="th-product-view__zoom"></a>',
    link: function (scope, element, attrs) {
      element.addClass('easyzoom');
      var easyzoom = element.easyZoom();
      var api = easyzoom.data('easyZoom');

      attrs.$observe('isDesktop', function (newValue) {
        var isDesktop = JSON.parse(newValue);
        element.toggleClass('easyzoom--adjacent', isDesktop);
        element.toggleClass('easyzoom--overlay', !isDesktop);
      });

      attrs.$observe('zoomImageUrl', function (newValue) {
        imageHash.zoomImage = newValue;
        swapImages(api);
      });

      attrs.$observe('imageUrl', function (newValue) {
        imageHash.mainImage = newValue;
        swapImages(api);
      });
    }
  };
}]);
