angular.module('Volusion.directives')
	.directive('easyZoom', function() {

		'use strict';

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

			'use strict';

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
