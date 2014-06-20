describe('Controller: PageCtrl', function () {
    'use strict';

    // load the controller's module
    beforeEach(module('methodApp'));

    var PageCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        PageCtrl = $controller('PageCtrl', {
            $scope: scope
        });
    }));

//    it('should attach a list of awesomeThings to the scope', function () {
//        expect(scope.awesomeThings.length).toBe(3);
//    });
});
