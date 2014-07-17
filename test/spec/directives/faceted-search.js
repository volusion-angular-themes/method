'use strict';

describe('Directive: facetedSearch', function () {

	// load the directive's module
	beforeEach(module('methodApp'));

	var element,
		scope;

	beforeEach(inject(function ($rootScope) {
		scope = $rootScope.$new();
	}));

	xit('should make hidden element visible', inject(function ($compile) {
		element = angular.element('<faceted-search></faceted-search>');
		element = $compile(element)(scope);
		expect(element.text()).toBe('this is the facetedSearch directive');
	}));
});
