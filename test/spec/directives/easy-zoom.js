///*global angular, describe, module, beforeEach, it, inject, expect */

// TODO : Figure out why this is an issue: ReferenceError: MessageFormat is not defined

describe.skip('Directive: easyZoom', function() {

	'use strict';

	// load the directive's module
	beforeEach(module('methodApp'));

	var element,
	    scope;

	beforeEach(inject(function($rootScope) {
		scope = $rootScope.$new();
	}));

	it('should make hidden element visible', inject(function($compile) {
		element = angular.element('<easy-zoom></easy-zoom>');
		element = $compile(element)(scope);
		expect(element.text()).toBe('this is the easyZoom directive');
	}));
});
