'use strict';

// ReSharper disable WrongExpressionStatement
describe('Directive: vnMetaTags', function() {

  // load the directive's module
  beforeEach(module('vnMetaTags'));

  var $rootScope;
  var $compile;
  var $scope;

  /*jshint camelcase: false */
  beforeEach(inject(function(_$rootScope_, _$compile_) {
    $rootScope = _$rootScope_;
    $compile = _$compile_;
    $scope = $rootScope.$new();
  }));
  /*jshint camelcase: true */

  it('creates title and metatags', function() {
    var component = compile(addFixtureData($scope),
      function($elem) {

        return $elem.attr('data-title', 'seo.metatagTitle').
                  attr('data-description', 'seo.metatagDescription').
                  attr('data-keywords', 'seo.metatagKeywords');
      });
    expect(component.find('title')).to.have.text('foo');

    expect(component.find('meta[name=description]')).to.have.attr('content', 'bar');
    expect(component.find('meta[name=keywords]')).to.have.attr('content', 'baz');
  });

  it('updates the title and metatags when scope changes', function() {
    var scope = addFixtureData($rootScope.$new());
    var component = $compile(angular.element('<div/>').
                                attr('data-vn-meta-tags', '').
                                attr('data-title', 'seo.metatagTitle').
                                attr('data-description', 'seo.metatagDescription').
                                attr('data-keywords', 'seo.metatagKeywords'))(scope);

    scope.$digest();
    var metaTags = component.find('meta');
    expect(component.find('title')).to.have.text('foo');
    expect(metaTags.length).to.be(2);
    expect(component.find('meta[name=description]')).to.have.attr('content', 'bar');
    expect(component.find('meta[name=keywords]')).to.have.attr('content', 'baz');

    scope.seo.metatagTitle = 'qux';
    scope.seo.metatagDescription = 'quux';
    scope.seo.metatagKeywords = 'garply';
    scope.$digest();

    expect(component.find('title')).to.have.text('qux');
    expect(component.find('meta[name=description]')).to.have.attr('content', 'quux');
    expect(component.find('meta[name=keywords]')).to.have.attr('content', 'garply');
  });

  it('does not create title and metatags if nothing sent in', function() {
    var component = compile(addFixtureData($scope), function($elem){
      return $elem;
    });
    var metaTags = component.find('meta');
    expect(component.find('title').length).to.be(0);
    expect(metaTags.length).to.be(0);
  });

  it('appends meta tags sent in the toAppend property', function() {
    var component = compile(addFixtureData($scope, { globallyAppendedMetatags: '<meta name="qux" content="quux">' }),
      function($elem) {
        return $elem.attr('data-title', 'seo.metatagTitle').
                  attr('data-to-append', 'seo.globallyAppendedMetatags');
      });
    var metaTags = component.find('meta');
    expect(component.find('title')).to.have.text('foo');
    expect(metaTags.length).to.be(1);
    expect(component.find('meta[name=qux]')).to.have.attr('content', 'quux');
  });

  it('appends robots meta tags if enableRobots is true', function() {
    var component = compile(addFixtureData($scope, { enableRobotsMetatags: true }),
      function($elem) {
        return $elem.attr('data-title', 'seo.metatagTitle').
                  attr('data-description', 'seo.metatagDescription').
                  attr('data-keywords', 'seo.metatagKeywords').
                  attr('data-robots', 'seo.enableRobotsMetatags');
      });
    var metaTags = component.find('meta');
    expect(component.find('title')).to.have.text('foo');
    expect(metaTags.length).to.be(4);
    expect(component.find('meta[name=robots]')).to.have.attr('content', 'index,follow');
    expect(component.find('meta[name=GOOGLEBOT]')).to.have.attr('content', 'INDEX,FOLLOW');
  });


  it('does not append robots meta tags if enableRobots is false', function() {
    var component = compile(addFixtureData($scope, { enableRobotsMetatags: false }),
      function($elem) {
        return $elem.attr('data-title', 'seo.metatagTitle').
                  attr('data-description', 'seo.metatagDescription').
                  attr('data-keywords', 'seo.metatagKeywords').
                  attr('data-robots', 'seo.enableRobotsMetatags');
      }
    );

    var metaTags = component.find('meta');
    expect(component.find('title')).to.have.text('foo');
    expect(metaTags.length).to.be(2);
    expect(component.find('meta[name=robots]')).to.not.have.attr('content', 'index,follow');
    expect(component.find('meta[name=GOOGLEBOT]')).to.not.have.attr('content', 'INDEX,FOLLOW');
  });



  function compile(scope, fn) {
    var $div = angular.element('<div/>')
      .attr('data-vn-meta-tags', '');
    var template;

    if (typeof fn === 'function') {

      template = $compile(fn($div));
    }
    var $component = template(scope);

    scope.$digest();
    return $component;
  }

  function addFixtureData(scope, extensions) {
    scope.seo = angular.extend({
        metatagTitle: 'foo',
        metatagDescription: 'bar',
        metatagKeywords: 'baz'
      }, extensions);

    return scope;
  }

});
