'use strict';

// ReSharper disable WrongExpressionStatement
describe('Directive: legacyLink', function() {

  // load the directive's module
  beforeEach(module('volusionApp'));

  var element;
  var scope;

  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope.$new();
    element = angular.element('<a data-legacy-link="/foo"></a>');
    element = $compile(element)(scope);
  }));

  it('assigns the value to the href', function() {
    expect(element.attr('href')).to.eq('/foo');
  });

  it('assigns the value to the href', inject(function($window) {
    var assign = sinon.stub($window.location, 'assign');
    element.click();
    expect(assign).to.have.been.calledOnce;
    expect(assign).to.have.been.calledWithMatch(/\/foo$/);
    $window.location.assign.restore();
  }));
});
