'use strict';

describe('Filter: minHour', function () {

  // load the filter's module
  beforeEach(module('flightApp'));

  // initialize a new instance of the filter before each test
  var minHour;
  beforeEach(inject(function ($filter) {
    minHour = $filter('minHour');
  }));

  it('should return the input prefixed with "minHour filter:"', function () {
    var text = 'angularjs';
    expect(minHour(text)).toBe('minHour filter: ' + text);
  });

});
