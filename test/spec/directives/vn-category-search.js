describe('Directive: vnCategorySearch', function () {
    'use strict';

    // load the directive's module
    beforeEach(module('methodApp'));

    var element,
        scope;

    beforeEach(inject(function ($rootScope) {
        scope = $rootScope.$new();
    }));

    it('should make hidden element visible', inject(function ($compile) {
        element = angular.element('<vn-category-search></vn-category-search>');
        element = $compile(element)(scope);
        expect(element.text()).toBe('this is the vnCategorySearch directive');
    }));
});
