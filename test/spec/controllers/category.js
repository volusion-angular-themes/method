describe('Controller: CategoryCtrl', function () {
    'use strict';

    // load the controller's module
    beforeEach(module('methodApp'));

    var CategoryCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        CategoryCtrl = $controller('CategoryCtrl', {
            $scope: scope
        });
    }));

    it('should attach a list of awesomeThings to the scope', function () {
        expect(scope.awesomeThings.length).toBe(3);
    });
});
