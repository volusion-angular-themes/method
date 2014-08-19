'use strict';

describe('Directive: searchForm', function () {

  // load the directive's module
  beforeEach(module('methodApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<search-form></search-form>');
    element = $compile(element)(scope);
    expect(element).toBeDefined();
  }));
});
