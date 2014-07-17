'use strict';

// TODO : Figure out why this is an issue: ReferenceError: MessageFormat is not defined

// ReSharper disable WrongExpressionStatement
describe('Directive: legacyLink', function() {

	// load the directive's module
	beforeEach(module('Volusion.directives'));

	var element;
	var scope;

	beforeEach(inject(function($rootScope, $compile) {
		scope = $rootScope.$new();
		element = angular.element('<a data-legacy-link="/foo"></a>');
		element = $compile(element)(scope);
		scope.$digest();
	}));

	it('assigns the value to the href', function() {
		expect(element.attr('href')).to.eq('/foo');
	});

	it('goes to the specified location on click', inject(function($window) {
		var assign = sinon.stub($window.location, 'assign');
		element.click();
		expect(assign).to.have.been.calledOnce; // jshint ignore:line
		expect(assign).to.have.been.calledWithMatch(/\/foo$/);
		$window.location.assign.restore();
	}));
});
