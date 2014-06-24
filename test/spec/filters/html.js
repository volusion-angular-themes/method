'use strict';

// ReSharper disable WrongExpressionStatement
describe('Filter: html', function() {

  beforeEach(module('volusion.filters', 'ngSanitize'));
  var $compile, scope;

  /*jshint camelcase: false */
  beforeEach(inject(function ($rootScope, _$compile_) {
    scope = $rootScope.$new();
    $compile = _$compile_;
  }));
  /*jshint camelcase: true */

  function compile(content) {
    scope.content = content;
    var element = angular.element('<div data-ng-bind-html="content | html" />');
    element = $compile(element)(scope);
    scope.$digest();
    return element;
  }

  it('allows unsafe html (button) to be bound', function () {
    var htmlContent = '<div><span>foo</span><button>bar</button></div>';
    var $elem = compile(htmlContent);
    expect($elem.html()).to.eq(htmlContent);
  });

  it('binds empty string if content is undefined', function () {
    var $elem = compile();
    expect($elem.html()).to.be.empty;
  });

});
