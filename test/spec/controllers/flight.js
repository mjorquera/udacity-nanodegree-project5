'use strict';

describe('Controller: FlightCtrl', function () {

  // load the controller's module
  beforeEach(module('flightApp'));

  var FlightCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FlightCtrl = $controller('FlightCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FlightCtrl.awesomeThings.length).toBe(3);
  });
});
