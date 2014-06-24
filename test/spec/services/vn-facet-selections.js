'use strict';

describe('Service: vnFacetSelections', function () {

    // load the service's module
    beforeEach(module('methodApp'));

    // instantiate service
    var vnFacetSelections;
    beforeEach(inject(function (_vnFacetSelections_) {
        vnFacetSelections = _vnFacetSelections_;
    }));

    it('should do something', function () {
        expect(!!vnFacetSelections).toBe(true);
    });

});
