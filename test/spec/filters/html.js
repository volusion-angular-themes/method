'use strict';

// ReSharper disable WrongExpressionStatement
describe('Filter: html', function() {

	beforeEach(module('Volusion.filters', 'ngSanitize'));
	var $compile, scope;

	/*jshint camelcase: false */
	beforeEach(inject(function($rootScope, _$compile_) {
		scope = $rootScope.$new();
		$compile = _$compile_;
	}));
	/*jshint camelcase: true */

	function compile(content, withoutFilter) {
		scope.content = content;
		var element,
				htmlTemplate = withoutFilter ? '<div data-ng-bind-html="content" />' : '<div data-ng-bind-html="content | html" />';

		element = angular.element(htmlTemplate);

		element = $compile(element)(scope);
		scope.$digest();
		return element;
	}

	it('allows unsafe html (button) to be bound', function() {
		var htmlContent = '<div><span>foo</span><button>bar</button></div>',
				elem,
				elemWithoutFilter;

		elemWithoutFilter = compile(htmlContent, true);
		expect(elemWithoutFilter.html()).toNotEqual(htmlContent);


		elem = compile(htmlContent);
		expect(elem.html()).toEqual(htmlContent);
	});

	it('binds empty string if content is undefined', function() {
		var $elem = compile();
		expect($elem.html()).toBe('');
	});

});
