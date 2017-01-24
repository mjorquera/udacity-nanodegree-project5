'use strict';

describe('Filter: flightStatus', function () {

  // load the filter's module
  beforeEach(module('flightApp'));

  // initialize a new instance of the filter before each test
  var flightStatus;
  beforeEach(inject(function ($filter) {
    flightStatus = $filter('flightStatus');
  }));

  it('should return the input prefixed with "flightStatus filter:"', function () {
    var text = 'angularjs';
    expect(flightStatus(text)).toBe('flightStatus filter: ' + text);
  });

});
