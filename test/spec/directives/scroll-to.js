describe('Directive: scrollTo', function () {

	'use strict';

	// load the directive's module
	beforeEach(module('methodApp'));

	var element,
		scope;

	beforeEach(inject(function ($rootScope) {
		scope = $rootScope.$new();
	}));

	xit('should make hidden element visible', inject(function ($compile) {
		element = angular.element('<scroll-to></scroll-to>');
		element = $compile(element)(scope);
		expect(element.text()).toBe('this is the scrollTo directive');
	}));
});
