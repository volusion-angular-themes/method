'use strict';

describe('Directive: vnFacetSearch', function () {

    // load the directive's module
    beforeEach(module('methodApp'));

    var element,
        scope;

    beforeEach(inject(function ($rootScope) {
        scope = $rootScope.$new();
    }));

    it('should make hidden element visible', inject(function ($compile) {
        element = angular.element('<vn-facet-search></vn-facet-search>');
        element = $compile(element)(scope);
        expect(element.text()).toBe('this is the vnFacetSearch directive');
    }));
});
