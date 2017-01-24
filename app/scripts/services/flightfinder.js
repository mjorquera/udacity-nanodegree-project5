'use strict';

/**
 * @ngdoc service
 * @name flightApp.flightFinder
 * @description
 * # flightFinder
 * Service in the flightApp.
 */
angular.module('flightApp')
  .service('flightFinder', function () {
    var appId = "14d7fd85";
    var appKey = "d12d06df7b12bd6c59a69b3aaef0f348";
    var baseUrl = "https://api.flightstats.com/flex/flightstatus/rest/v2/jsonp/"

    this.getDepartureFlightsByAirport = function(airportId, year, month, day, hourOfDay){
      var url = baseUrl + "airport/status/" + airportId + "/dep/" + year + "/"+ month +"/"+ day +"/" + hourOfDay;
      url += "?appId=" + appId + "&appKey=" + appKey + "&utc=false&numHours=2&maxFlights=20";
      var results = function(data){
        return data;
      };
      return $.ajax({
          url: url,
          dataType: "jsonp",
          jsonpCallback: "results"
        });
    };
  });
