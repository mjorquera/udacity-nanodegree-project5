'use strict';

/**
 * @ngdoc function
 * @name flightApp.controller:FlightCtrl
 * @description
 * # FlightCtrl
 * Controller of the flightApp
 */
angular.module('flightApp')
  .controller('FlightCtrl',['airportFinder', function (airportService) {
    var vm = this;

    vm.mapcenter = {
      lat: 51.498395,
      lng: -0.120857,
      zoom: 7
    };

    vm.markers = [];

    airportService.getCountries().then(function(data){
      vm.countries = data;
    });

    vm.selectCountry = function(){
      vm.selectedAirportCode = null;

      airportService.getAirports(vm.selectedCountry).then(function(data){
          vm.airports = data;
      });
    };

    vm.selectAirport = function(){
      vm.selectedAirport = vm.airports.filter(function(obj){
        return obj.iata == vm.selectedAirportCode;
      })[0];

      addMarker(vm.selectedAirport);
    };

    var addMarker = function(airport){
        var marker = {
          id: airport.iata,
          lat: parseFloat(airport.lat),
          lng: parseFloat(airport.lon),
          message: airport.name + " (" + airport.iata + ")",
          draggable: false,
          focus: true
        };
        console.log(marker);
        vm.markers.push(marker);
    };
  }]);
