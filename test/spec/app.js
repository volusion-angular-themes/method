'use strict';

describe('App: volusionApp', function () {
  var $window, $rootScope;

  beforeEach(module('volusionApp', function($provide) {
    $window = {
      location: {
        replace: sinon.spy()
      }
    };

    $provide.value('$window', $window);
  }));

  beforeEach(inject(function (_$rootScope_) {
    $rootScope = _$rootScope_;
  }));

  it('redirects the user to the 404 page if there is a state change error with status 404', function () {
    $rootScope.$emit('$stateChangeError', null, null, null, null, { status: 404 });
    expect($window.location.replace).to.have.been.calledOnce;
  });
});
