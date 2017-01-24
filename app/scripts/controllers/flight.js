'use strict';

/**
 * @ngdoc function
 * @name flightApp.controller:FlightCtrl
 * @description
 * # FlightCtrl
 * Controller of the flightApp
 */
angular.module('flightApp')
  .controller('FlightCtrl',['$stateParams','airportFinder','flightFinder','leafletBoundsHelpers', function ($stateParams, airportService, flightService, leafletBoundsHelpers) {
    var vm = this;
    var currentDate = new Date();

    vm.yearQuery = currentDate.getFullYear();
    vm.monthQuery = currentDate.getMonth() + 1;
    vm.dayQuery = currentDate.getDate();
    vm.hourQuery = currentDate.getHours();
    vm.airportId = $stateParams.airportId;
    vm.markers = [];
    vm.paths = [];

    airportService.getAirport(vm.airportId).then(function(data){
      vm.airport = data;
      addMarker(vm.airport);
    });

    flightService.getDepartureFlightsByAirport(vm.airportId, vm.yearQuery, vm.monthQuery, vm.dayQuery, vm.hourQuery).then(function(data){
      vm.flightResults = data;
    });
    
    vm.mapcenter = {
      lat: 0,
      lng: 0,
      zoom: 4
    };

    var addMarker = function(airport){
        if(!airport.lat || !airport.lon) return;
        
        var marker = {
          id: airport.iata,
          lat: parseFloat(airport.lat),
          lng: parseFloat(airport.lon),
          message: airport.name + " (" + airport.iata + ")",
          draggable: false,
          focus: true
        };

        vm.mapcenter.lat = marker.lat;
        vm.mapcenter.lng = marker.lng;
        vm.markers.push(marker);
    };

    var addMarkerFromAppendix = function(airport){
        if(!airport.latitude || !airport.longitude) return;
        
        var marker = {
          id: airport.iata,
          lat: parseFloat(airport.latitude),
          lng: parseFloat(airport.longitude),
          message: airport.name + " (" + airport.iata + ")",
          draggable: false,
          focus: true
        };

        // vm.mapcenter.lat = marker.lat;
        // vm.mapcenter.lng = marker.lng;
        vm.markers.push(marker);
    };

    var createPath = function(destinationAirport){
      vm.paths =  {
                    p1: {
                            color: '#3c9bc7',
                            weight: 3,
                            dashArray: "5,5",
                            latlngs: [
                                { lat: parseFloat(vm.airport.lat), lng: parseFloat(vm.airport.lon) },
                                { lat: parseFloat(destinationAirport.latitude), lng: parseFloat(destinationAirport.longitude) }
                            ]
                        }
                }
      vm.bounds = leafletBoundsHelpers.createBoundsFromArray([
          [ parseFloat(vm.airport.lat), parseFloat(vm.airport.lon) ],
          [ parseFloat(destinationAirport.latitude), parseFloat(destinationAirport.longitude) ]
      ]);
    };

    vm.getAirportAppendix = function(airportId){
      return vm.flightResults.appendix.airports.filter(function(obj){
            return obj.fs == airportId;
          })[0];
    };

    vm.getAirlineAppendix = function(airlineId){
      return vm.flightResults.appendix.airlines.filter(function(obj){
            return obj.fs == airlineId;
          })[0];
    };

    vm.getStatusClass = function(status){
      var output;
      switch (status) {
        case "A":
          output = "label-primary";
          break;
        case "C":
          output = "label-danger";
          break;
        case "D":
        case "R":
          output = "label-info";
          break;
        case "L":
        case "S":
          output = "label-success";
          break;
        case "NO":
          output = "label-warning";
          break;
        default:
          output = "label-default";
          break;
      }

      return output;
    };

    vm.selectFlight = function(flightId){
      vm.selectedFlight = vm.flightResults.flightStatuses.filter(function(obj){
            return obj.flightId == flightId;
          })[0];
      
      var destinationAirport = vm.getAirportAppendix(vm.selectedFlight.arrivalAirportFsCode);
      if(vm.markers.length > 1) vm.markers.pop();
      addMarkerFromAppendix(destinationAirport);
      createPath(destinationAirport);
    };
  }]);
