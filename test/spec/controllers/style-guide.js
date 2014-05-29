'use strict';

// ReSharper disable WrongExpressionStatement
describe('Controller: StyleGuideCtrl', function () {

  beforeEach(module('volusion.controllers'));

  var controller;
  var scope;

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    controller = $controller('StyleGuideCtrl', {
      $scope: scope
    });
  }));

});
