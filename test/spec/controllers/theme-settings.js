'use strict';

// ReSharper disable WrongExpressionStatement
describe('Controller: ThemeSettingsCtrl', function () {

  beforeEach(module('volusion.controllers', 'volusion.filters'));

  var controller;
  var scope;

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    controller = $controller('ThemeSettingsCtrl', {
      $scope: scope
    });
  }));

});
