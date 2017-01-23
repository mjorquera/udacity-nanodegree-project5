'use strict';

/**
 * @ngdoc service
 * @name flightApp.aiportFinder
 * @description
 * # aiportFinder
 * Service in the flightApp.
 */
angular.module('flightApp')
  .service('aiportFinder', ['$indexedDB', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.getAirports = function() {
      return $.get( '/data/airports.json' );
    };
  }]);
