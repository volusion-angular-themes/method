'use strict';

describe('Directive: paginator.js', function () {

  // load the directive's module
  beforeEach(module('volusionMethodThemeApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  xit('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<paginator.js></paginator.js>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the paginator.js directive');
  }));
});
