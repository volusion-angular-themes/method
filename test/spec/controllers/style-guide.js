'use strict';

describe('Controller: StyleGuideCtrl', function () {

  // load the controller's module
  beforeEach(module('volusionApp'));

  // ReSharper disable once InconsistentNaming
  var controller;
  var scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    controller = $controller('StyleGuideCtrl', {
      $scope: scope
    });
  }));

  it('', function() {});

});
