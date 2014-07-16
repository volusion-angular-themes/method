'use strict';

describe('Directive: facetedSearch', function () {

  // load the directive's module
  beforeEach(module('volusionMethodThemeApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<faceted-search></faceted-search>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the facetedSearch directive');
  }));
});
