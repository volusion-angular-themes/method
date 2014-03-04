'use strict';

// ReSharper disable WrongExpressionStatement
describe('View: style-guide', function() {

  beforeEach(module('volusionApp'));

  var $view;

  beforeEach(inject(function($templateCache) {
    $view = $('<body/>').html($templateCache.get('views/style-guide.html'));
  }));

  it('has a jumbotron', function() {
    var $jumbotron = $view.find('.jumbotron');
    expect($jumbotron).to.exist;
    expect($jumbotron).to.have('h1');
    expect($jumbotron).to.have('p');
    expect($jumbotron).to.have('a.btn.btn-primary.btn-lg[role=button]');
  });

  it('has a page header', function() {
    var $pageHeader = $view.find('.page-header');
    expect($pageHeader).to.have('h1');
  });

  it('has large buttons', function() {
    var $lgButtons = $view.find('.btn-lg');
    expect($lgButtons.filter('.btn-default')).to.exist;
    expect($lgButtons.filter('.btn-primary')).to.exist;
    expect($lgButtons.filter('.btn-success')).to.exist;
    expect($lgButtons.filter('.btn-info')).to.exist;
    expect($lgButtons.filter('.btn-warning')).to.exist;
    expect($lgButtons.filter('.btn-danger')).to.exist;
    expect($lgButtons.filter('.btn-link')).to.exist;
  });

  it('has default buttons', function() {
    var $defaultButtons = $view.find('.btn:not(.btn-lg,.btn-sm,.btn-xs)');
    expect($defaultButtons.filter('.btn-default')).to.exist;
    expect($defaultButtons.filter('.btn-primary')).to.exist;
    expect($defaultButtons.filter('.btn-success')).to.exist;
    expect($defaultButtons.filter('.btn-info')).to.exist;
    expect($defaultButtons.filter('.btn-warning')).to.exist;
    expect($defaultButtons.filter('.btn-danger')).to.exist;
    expect($defaultButtons.filter('.btn-link')).to.exist;
  });

  it('has small buttons', function() {
    var $smButtons = $view.find('.btn-sm');
    expect($smButtons.filter('.btn-default')).to.exist;
    expect($smButtons.filter('.btn-primary')).to.exist;
    expect($smButtons.filter('.btn-success')).to.exist;
    expect($smButtons.filter('.btn-info')).to.exist;
    expect($smButtons.filter('.btn-warning')).to.exist;
    expect($smButtons.filter('.btn-danger')).to.exist;
    expect($smButtons.filter('.btn-link')).to.exist;
  });

  it('has extra small buttons', function() {
    var $xsButtons = $view.find('.btn-xs');
    expect($xsButtons.filter('.btn-default')).to.exist;
    expect($xsButtons.filter('.btn-primary')).to.exist;
    expect($xsButtons.filter('.btn-success')).to.exist;
    expect($xsButtons.filter('.btn-info')).to.exist;
    expect($xsButtons.filter('.btn-warning')).to.exist;
    expect($xsButtons.filter('.btn-danger')).to.exist;
    expect($xsButtons.filter('.btn-link')).to.exist;
  });

  it('has an image thumbnail', function() {
    expect($view.find('.img-thumbnail')).to.exist;
  });

  it('has a dropdown menu', function() {
    var $dropdown = $view.find('.dropdown.theme-dropdown');
    expect($dropdown).to.exist;
    expect($dropdown).to.have('.dropdown-toggle[role=button][data-toggle=dropdown]');
    var $menu = $dropdown.find('.dropdown-menu[role=menu][aria-labelledby]');
    expect($menu).to.exist;
    expect($menu).to.have('[role=presentation]');
    expect($menu).to.have('[role=menuitem]');
    expect($menu).to.have('.active');
    expect($menu).to.have('.divider');
  });

  it('has navbars', function() {
    function validateNavbar($navbar) {
      expect($navbar).to.exist;
      expect($navbar).to.have('.container');
      var $navbarHeader = $navbar.find('.navbar-header');
      expect($navbarHeader).to.exist;
      expect($navbarHeader).to.have('button.navbar-toggle[type=button][data-toggle=collapse][data-target]');
      expect($navbarHeader).to.have('.icon-bar');
      expect($navbarHeader).to.have('a.navbar-brand');
      var $navbarCollapse = $navbar.find('.collapse.navbar-collapse');
      expect($navbarCollapse).to.have('.nav.navbar-nav');
      expect($navbarCollapse).to.have('.active');
      var $dropdown = $navbarCollapse.find('.dropdown');
      expect($dropdown).to.exist;
      expect($dropdown).to.have('a.dropdown-toggle[data-toggle=dropdown]');
      expect($dropdown).to.have('.dropdown-menu');
      expect($dropdown).to.have('.divider');
      expect($dropdown).to.have('.dropdown-header');
    }
    validateNavbar($view.find('.navbar.navbar-default'));
    validateNavbar($view.find('.navbar.navbar-inverse'));
  });

  it('has alerts', function() {
    var $alerts = $view.find('.alert');
    expect($alerts.filter('.alert-success')).to.exist;
    expect($alerts.filter('.alert-info')).to.exist;
    expect($alerts.filter('.alert-warning')).to.exist;
    expect($alerts.filter('.alert-danger')).to.exist;
  });

  it('has progress bars', function() {
    var $progressBars = $view.find('.progress .progress-bar[role=progressbar][aria-valuenow][aria-valuemin][aria-valuemax][style]');
    expect($progressBars.filter('.progress-bar-success')).to.exist;
    expect($progressBars.filter('.progress-bar-info')).to.exist;
    expect($progressBars.filter('.progress-bar-warning')).to.exist;
    expect($progressBars.filter('.progress-bar-danger')).to.exist;
    var $lastProgress = $view.find('.progress').last();
    expect($lastProgress).to.have('.progress-bar.progress-bar-success');
    expect($lastProgress).to.have('.progress-bar.progress-bar-warning');
    expect($lastProgress).to.have('.progress-bar.progress-bar-danger');
  });

  it('has list groups', function() {
    var $listGroupItems = $view.find('.list-group .list-group-item');
    expect($listGroupItems).to.exist;
    expect($listGroupItems.filter('.active')).to.exist;
    expect($listGroupItems).to.have('.list-group-item-heading');
    expect($listGroupItems).to.have('.list-group-item-text');
  });

  it('has panels', function() {
    function validatePanel($panel) {
      expect($panel).to.exist;
      expect($panel).to.have('.panel-heading');
      expect($panel).to.have('h3.panel-title');
      expect($panel).to.have('.panel-body');
    }
    var $panels = $view.find('.panel');
    validatePanel($panels.filter('.panel-default'));
    validatePanel($panels.filter('.panel-primary'));
    validatePanel($panels.filter('.panel-success'));
    validatePanel($panels.filter('.panel-info'));
    validatePanel($panels.filter('.panel-warning'));
    validatePanel($panels.filter('.panel-danger'));
  });

  it('has a well', function() {
    var $well = $view.find('.well');
    expect($well).to.exist;
    expect($well).to.have('p');
  });

});
