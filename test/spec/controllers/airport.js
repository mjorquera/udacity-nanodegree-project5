'use strict';

describe('Controller: AirportCtrl', function () {

  // load the controller's module
  beforeEach(module('flightApp'));

  var AirportCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AirportCtrl = $controller('AirportCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AirportCtrl.awesomeThings.length).toBe(3);
  });
});
