'use strict';

describe('Service: aiportFinder', function () {

  // load the service's module
  beforeEach(module('flightApp'));

  // instantiate service
  var aiportFinder;
  beforeEach(inject(function (_aiportFinder_) {
    aiportFinder = _aiportFinder_;
  }));

  it('should do something', function () {
    expect(!!aiportFinder).toBe(true);
  });

});
