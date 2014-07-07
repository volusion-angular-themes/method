'use strict';

///**
// * @ngdoc directive
// * @name methodApp.directive:easyZoom
// * @description
// * # easyZoom
// */
//angular.module('methodApp')
//  .directive('easyZoom', function () {
//    return {
//      template: '<div></div>',
//      restrict: 'E',
//      link: function postLink(scope, element, attrs) {
//        element.text('this is the easyZoom directive');
//      }
//    };
//  });

// http://i-like-robots.github.io/EasyZoom/
angular.module('Volusion.directives')
	.directive('easyZoom', function() {

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
			templateUrl: 'template/easyZoom.html',
			scope: {
				ngSrc: '=',
				ezAdjacent: '=',
				ezOverlay: '=',
				ezZoomSrc: '=',
				alt: '@'
			},
			link: function(scope, element) {
				var easyzoom = element.easyZoom(),
					api = easyzoom.data('easyZoom');

				scope.$watch('ngSrc', function(newValue) {
					if (newValue === undefined) {
						return;
					}

					imageHash.standardSrc = newValue;
					swapImages(api);
				});

				scope.$watch('ezZoomSrc', function(newValue) {
					if (newValue === undefined) {
						return;
					}

					imageHash.zoomSrc = newValue;
					swapImages(api);
				});

				scope.$on('$destroy', function() {
					api.teardown();
				});
			}
		};
	})
	.run([
		'$templateCache', function($templateCache) {

			$templateCache.put(
				'template/easyZoom.html',
				'<div class="easyzoom easyzoom--adjacent" data-ng-class="{ \'easyzoom--adjacent\': ezAdjacent, \'easyzoom--overlay\': ezOverlay }">' +
				'<a data-ng-href="{{ezZoomSrc}}">' +
				'<img class="img-responsive" data-ng-src="{{ngSrc}}" alt="{{alt}}">' +
				'<div class="th-product-view__zoom"></div>' +
				'</a>' +
				'</div>'
			);
		}
	]);
