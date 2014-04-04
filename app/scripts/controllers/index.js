'use strict';

module.exports = [
  '$scope',
  '$state',
  function(
    $scope,
    $state) {

    $scope.$on('$stateChangeSuccess', function(event, toState) {
      if (toState.name === 'i18n') {
        $state.go('.home', null, { location: 'replace' });
      }
    });

  }
];
