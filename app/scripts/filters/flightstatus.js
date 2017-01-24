'use strict';

/**
 * @ngdoc filter
 * @name flightApp.filter:flightStatus
 * @function
 * @description
 * # flightStatus
 * Filter in the flightApp.
 */
angular.module('flightApp')
  .filter('flightStatus', function () {
    return function (input) {

      var output;
      switch (input) {
        case "A":
          output = "Active";
          break;
        case "C":
          output = "Canceled";
          break;
        case "D":
          output = "Diverted";
          break;
        case "DN":
          output = "Data source needed";
          break;
        case "L":
          output = "Landed";
          break;
        case "NO":
          output = "Not Operational";
          break;
        case "R":
          output = "Redirected";
          break;
        case "S":
          output = "Scheduled";
          break;
        default:
          output = "Unknown";
          break;
      }

      return output;
    };
  });
