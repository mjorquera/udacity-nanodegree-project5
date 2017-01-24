'use strict';

describe('Service: flightsFinder', function () {

  // load the service's module
  beforeEach(module('flightApp'));

  // instantiate service
  var flightsFinder;
  beforeEach(inject(function (_flightsFinder_) {
    flightsFinder = _flightsFinder_;
  }));

  it('should do something', function () {
    expect(!!flightsFinder).toBe(true);
  });

});
