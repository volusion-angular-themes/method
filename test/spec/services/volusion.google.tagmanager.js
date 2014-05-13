'use strict';

describe('Service: volusion.google.tagmanager', function() {

  describe('config method', function() {
    it('registers the page track and event track methods of the analytics provider', function() {

      config(function(analyticsProvider) {
        var pageTrack = sinon.spy(analyticsProvider, 'registerPageTrack');
        var eventTrack = sinon.spy(analyticsProvider, 'registerEventTrack');
        expect(pageTrack).to.have.been.calledOnce;
        expect(eventTrack).to.have.been.calledOnce;
        analyticsProvider.registerPageTrack.restore();
        analyticsProvider.registerEventTrack.restore();
      });
    });
  });

  describe('tracking events', function () {
    it('it calls the page and event track function of the module', function () {
      var pageTrackData;
      var eventTrackData;

      var eventProps = {
        category: 'foo',
        label: 'bar',
        value: 'baz',
        noninteraction: 'qux',
        location: 'quux',
        description: 'plugh'
      };
      var eventName = 'thud';
      config();
      inject(function($analytics) {
        window.dataLayer = [];
        $analytics.pageTrack('/foo/bar');
        expect(window.dataLayer.length).to.eq(1);
        pageTrackData = window.dataLayer[0];
        expect(pageTrackData.event).to.eq('theme-engine');
        expect(pageTrackData['content-name']).to.eq('/foo/bar');

        $analytics.eventTrack(eventName, eventProps);
        expect(window.dataLayer.length).to.eq(2);
        eventTrackData = window.dataLayer[1];
        expect(eventTrackData.action).to.eq(eventName);
        expect(eventTrackData.event).to.eq('interaction');
        expect(eventTrackData.target).to.eq(eventProps.category);
        expect(eventTrackData.value).to.eq(eventProps.value);
        expect(eventTrackData['target-properties']).to.eq(eventProps.label);
        expect(eventTrackData['interaction-type']).to.eq(eventProps.noninteraction);
        expect(eventTrackData['event-location']).to.eq(eventProps.location);
        expect(eventTrackData['event-description']).to.eq(eventProps.description);
      });
    });
  });

  function config(callback) {
    module('volusion.google.tagmanager', function($analyticsProvider) {
      if (typeof callback === 'function') {
        callback($analyticsProvider);
      }
    });
  }
});
