'use strict';

/**
 * @ngdoc filter
 * @name flightApp.filter:minHour
 * @function
 * @description
 * # minHour
 * Filter in the flightApp.
 */
angular.module('flightApp')
  .filter('minHour', function () {
    return function (totalMinutes) {
      var hours = Math.floor( totalMinutes / 60);          
      var minutes = totalMinutes % 60;

      if(hours == 0){
        return minutes + " min";
      } else if(hours == 1){
        return hours + " hr " + minutes + " min";
      } else {
        return hours + " hrs " + minutes + " min";
      }
    };
  });
