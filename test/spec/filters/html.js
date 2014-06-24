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

  function compile(content, withoutFilter) {
    scope.content = content;
    var htmlTemplate = withoutFilter ?
      '<div data-ng-bind-html="content" />' :
      '<div data-ng-bind-html="content | html" />';
    var element = angular.element(htmlTemplate);
    element = $compile(element)(scope);
    scope.$digest();
    return element;
  }

  it('allows unsafe html (button) to be bound', function () {
    var htmlContent = '<div><span>foo</span><button>bar</button></div>';
    var $elemWithoutFilter = compile(htmlContent, true);
    expect($elemWithoutFilter.html()).to.not.eq(htmlContent);
    var $elem = compile(htmlContent);
    expect($elem.html()).to.eq(htmlContent);
  });

  it('binds empty string if content is undefined', function () {
    var $elem = compile();
    expect($elem.html()).to.be.empty;
  });

});
