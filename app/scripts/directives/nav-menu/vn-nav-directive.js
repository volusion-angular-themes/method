/**
 * @ngdoc directive
 * @name Volusion.toolboxCommon.directive:vnNav
 * @restrict EA
 * @requires $rootScope, $window, $timeout, vnApi
 * @scope
 * @description
 *
 * Replace the element with navbar's html markup. Accepts categoryList as array of objects.
 * If category list is not passed - a list from API will be requested
 * If node collapsing (to accomodate screen width) is not desired - set "use-smart-nav" to false
 *
 * @usage
 <div vn-nav></div>
 <div vn-nav use-smart-nav="false"></div>
 <div vn-nav category-list="categoryList"></div>

 -OR-------------------------------------

 <vn-nav category-list="categoryList"></vn-nav>
 *
 *
 * @example
     <example module="Volusion.toolboxCommon" deps="">
         <file name="script.js">
             angular.module('Volusion.toolboxCommon', [])
                .controller('NavCtrl',
                    function ($scope) {

                        $scope.categoryList = [
							{"id":1477,"name":"Home Decor","slug":"home-decor","url":"/c/home-decor","bannerImgUrl":"//cdn3.volusion.com/glvus.qafjh/v/vspfiles/photos/categories/1477.jpg?1409664332","description":null,"showProductCollection":true,"showSubCategories":true,
								"subCategories":[{"id":1516,"name":"Furniture","slug":"furniture","url":"/c/furniture","description":null,"subCategories":[]},
												 {"id":1517,"name":"Home Accessories","slug":"home-accessories","url":"/c/home-accessories","description":null,"subCategories":[]}]},
							{"id":1513,"name":"Beauty","slug":"beauty","url":"/c/beauty","description":null,"showProductCollection":true,"showSubCategories":true,
								"subCategories":[{"id":1553,"name":"Bath and Body","slug":"bath-and-body","url":"/c/bath-and-body","description":null,"subCategories":[]},
												 {"id":1554,"name":"Hair Care","slug":"hair-care","url":"/c/hair-care","description":null,"subCategories":[]}]},
							{"id":1514,"name":"Gourmet Food","slug":"gourmet-food","url":"/c/gourmet-food","bannerImgUrl":"//cdn3.volusion.com/glvus.qafjh/v/vspfiles/photos/categories/1514.jpg","description":"Let your taste buds indulge in a delicacy of flavors like never before. Rich chocolates for any occasion. Fresh fruit, organic and sourced locally. Natural flavors that bring a delicate balance of fruit flavors to the palate.<br /><br /><b>Taste the rainbow!</b><br />","showProductCollection":true,"showSubCategories":true,
								"subCategories":[{"id":1632,"name":"Specialty Items","slug":"specialty-items","url":"/c/specialty-items","description":null,"subCategories":[]},
												 {"id":1673,"name":"Sweets","slug":"sweets","url":"/c/sweets","description":null,"subCategories":[]}]},
							{"id":1814,"name":"Apparel","slug":"apparel","url":"/c/apparel","description":"Let your taste buds indulge in a delicacy of flavors like never before. Rich chocolates for any occasion. Fresh fruit, organic and sourced locally. Natural flavors that bring a delicate balance of fruit flavors to the palate.<br /><br /><b>Taste the rainbow!</b>","showProductCollection":true,"showSubCategories":true,
								"subCategories":[{"id":1815,"name":"Women","slug":"women","url":"/c/women","description":null,"subCategories":[]},
												 {"id":1816,"name":"Men","slug":"men","url":"/c/men","description":null,"subCategories":[]}]},
							{"id":1819,"name":"Stuff","slug":"stuff","url":"http://www.volusion.com/","description":null,"showProductCollection":true,"showSubCategories":true,
								"subCategories":[{"id":1851,"name":"Sub Test","slug":null,"url":null,"description":"<span style=\"font-family: Arial, Helvetica, sans-serif; text-align: right;\">Category Description</span>","subCategories":[]},
												 {"id":1852,"name":"Sub Test","slug":null,"url":null,"description":"<span style=\"font-family: Arial, Helvetica, sans-serif; text-align: right;\">Category Description</span>","subCategories":[]}]}
                        ];

                    });
         </file>
         <file name="index.html">
             <div data-ng-controller="NavCtrl">
                <vn-nav category-list="categoryList"></vn-nav>
             </div>
         </file>
     </example>
 */

angular.module('Volusion.toolboxCommon')
    .directive('vnNav', ['$rootScope', '$window', '$timeout', 'vnApi', function ($rootScope, $window, $timeout, vnApi) {

		'use strict';

		return {
			templateUrl: 'scripts/directives/nav-menu/vn-nav.tpl.html',
			restrict   : 'EA',
			replace    : true,
			scope      : {
				currMode     : '@',
				categoryList : '=',
				useSmartNav  : '@'
			},
			link       : function postLink(scope, element) {
				if (scope.currMode === undefined) {
					scope.currMode = 'on';
				}

				scope.useSmartNavigation = (scope.useSmartNav === undefined) ? 'true' : scope.useSmartNav;

				// Component constants *****************
				scope.componentId = '100005';
				scope.componentName = 'navbar';
				// *************************************

				// Component is not selected by default
				scope.selected = false;
				scope.displaySmartNavMoreMenuItem = false;

				scope.$on('currentComponent.change', function (event, component) {
					if (component && component.id && scope.currMode === 'off') {
						scope.selected = (component.id === scope.componentId);
					}
				});

				element.on('click', function (event) {
					// if in EDIT mode
					if (scope.currMode === 'off') {
						event.preventDefault();
						$rootScope.$broadcast('currentComponent.change', {'id': scope.componentId, 'name': scope.componentName, 'action': 'set'});
					}
				});

				var threshold = {
					windowWidth: -1,
					position   : 0
				};

				function buildSmartNav() {

					var itemIndex = 0,
						firstItemTopPosition = 0,
						indexPositionWhereItemWrapped = 0,
						newSmartNavCategories = [];

					// Reset threshold
					if (threshold.windowWidth !== -1 && scope.windowWidth > threshold.windowWidth) {
						indexPositionWhereItemWrapped = 0;
						threshold.windowWidth = -1;
						threshold.position = 0;
					}

					if (threshold.windowWidth === -1) {
						angular.forEach(angular.element('.nav-top-level-menu-items'), function (value) {
							// Get top position of first item
							if (itemIndex === 0) {
								firstItemTopPosition = angular.element(value).position().top;
							}

							if (angular.element(value).position().top !== firstItemTopPosition) {
								indexPositionWhereItemWrapped = itemIndex;
								return false;
							}

							itemIndex++;
						});
					}

					if (indexPositionWhereItemWrapped !== 0 || threshold.windowWidth !== -1) {
						// Initialize threshold
						if (threshold.windowWidth === -1) {
							threshold.windowWidth = scope.windowWidth;
							threshold.position = indexPositionWhereItemWrapped;
						} else {
							indexPositionWhereItemWrapped = threshold.position;
						}

						scope.smartNavMoreCategories = [];

						angular.forEach(scope.smartCategories, function (value, index) {
							if (index >= (indexPositionWhereItemWrapped - 1)) {
								scope.smartNavMoreCategories.push(value);
							} else {
								newSmartNavCategories.push(value);
							}
						});

						scope.smartNavCategories = newSmartNavCategories;
					} else {
						scope.smartNavCategories = scope.smartCategories;
					}

					scope.displaySmartNavMoreMenuItem = (indexPositionWhereItemWrapped !== 0);
				}

				function setAndBuildSmartNav (list) {
					scope.smartNavCategories = scope.smartCategories = list;

					if (scope.useSmartNavigation === 'true') {
						// Handle Navigation
						$timeout(function () {
							buildSmartNav();
						}, 0);
					}
				}

				scope.initializeWindowSize = function () {
					scope.windowWidth = $window.outerWidth;
				};

				scope.initializeWindowSize();

				if (scope.useSmartNavigation === 'true') {
					angular.element($window).bind('resize', function () {
						scope.initializeWindowSize();
						scope.$apply();

						buildSmartNav();
					});
				}

				if (scope.categoryList !== undefined) {
					setAndBuildSmartNav (scope.categoryList);

				}  else {
					vnApi.Nav().get({ navId: 1 }).$promise
						.then(function (response) {
							setAndBuildSmartNav (response.data);
						});
				}
			}
		};
	}]);
