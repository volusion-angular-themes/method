/**
 * @ngdoc directive
 * @name Volusion.toolboxCommon.directive:vnNavMobile
 * @restrict EA
 * @requires $rootScope, $window, $timeout, vnApi
 * @scope
 * @description
 *
 * Replace the element with navbar's html markup. Accepts categoryList as array of objects.
 * If category list is not passed - a list from API will be requested
 *
 * @usage
 <div vn-nav-mobile></div>
 <div vn-nav-mobile category-list="categoryList"></div>

 -OR-------------------------------------

 <vn-nav-mobile category-list="categoryList"></vn-nav-mobiile>
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
                <vn-nav-mobile category-list="categoryList"></vn-nav-mobile>
             </div>
         </file>
     </example>
 */

angular.module('Volusion.toolboxCommon')
    .directive('vnNavMobile', ['$rootScope', 'vnApi', function ($rootScope, vnApi) {

		'use strict';

		return {
			templateUrl: 'scripts/directives/nav-menu-mobile/vn-nav-mobile.tpl.html',
			restrict   : 'EA',
			replace    : true,
			scope      : {
				currMode     : '@',
				categoryList : '='
			},
			link       : function postLink(scope, element) {
				if (scope.currMode === undefined) {
					scope.currMode = 'on';
				}

				// Component constants *****************
				scope.componentId = '1000051';
				scope.componentName = 'navbar-mobile';
				// *************************************

				// Component is not selected by default
				scope.selected = false;

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

				vnApi.Nav().get({ navId: 1 }).$promise
					.then(function (response) {
						scope.categories = response.data;
					});
			}
		};
	}]);
