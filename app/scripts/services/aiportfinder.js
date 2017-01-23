'use strict';

/**
 * @ngdoc service
 * @name flightApp.airportFinder
 * @description
 * # airportFinder
 * Service in the flightApp.
 */
angular.module('flightApp')
  .service('airportFinder', ['$indexedDB', function ($indexedDB) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.getCountries = function() {
      return $.get( '/data/countries.json' );
    };

    this.getAirports = function(countryCode) {
      console.log("country code: " + countryCode);
      return $.get('/data/airports.json').then(function(data){
        console.log(data);
          return data.filter(function(obj){
            return obj.iso == countryCode && obj.name != null;
          })
      });
    };
  }]);
