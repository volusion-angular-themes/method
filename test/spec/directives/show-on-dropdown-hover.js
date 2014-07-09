'use strict';

describe('Directive: showOnDropdownHover', function () {

  // load the directive's module
  beforeEach(module('methodApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  xit('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<show-on-hover></show-on-hover>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the showOnHover directive');
  }));
});
