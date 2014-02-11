'use strict';

xdescribe('Controller: ThemeCtrl', function () {

  // load the controller's module
  beforeEach(module('volusionApp'));

  // ReSharper disable once InconsistentNaming
  var ThemeCtrl;
  var scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ThemeCtrl = $controller('ThemeCtrl', {
      $scope: scope
    });
  }));

});
