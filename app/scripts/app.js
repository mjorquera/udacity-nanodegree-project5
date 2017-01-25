'use strict';

/**
 * @ngdoc overview
 * @name flightApp
 * @description
 * # flightApp
 *
 * Main module of the application.
 */
angular
  .module('flightApp', ['ui.router','leaflet-directive','picardy.fontawesome','indexedDB'])
  .config(['$stateProvider', '$urlRouterProvider','$indexedDBProvider', function($stateProvider, $urlRouterProvider, $indexedDBProvider){
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/airport.html',
        controller: 'AirportCtrl as airport'
      })
      .state('flights', {
        url: '/flights/:airportId',
        templateUrl: 'views/flights.html',
        controller: 'FlightCtrl as flights'
      });

    $indexedDBProvider
      .connection('flight-app')
      .upgradeDatabase(1, function(event, db, tx){
        console.log(db);
        var objStore = db.createObjectStore('airports', {keyPath: 'iata'});
      });
  }])
  .run(['$rootScope', function($rootScope){
    //register of serviceWorker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then(function(reg) {
        $rootScope.installing = false;
        $rootScope.waiting = false;
        $rootScope.active = false;

        if(reg.installing) {
          $rootScope.installing = true;
          console.log('Service worker installing');
        } else if(reg.waiting) {
          $rootScope.waiting = true;
          console.log('Service worker installed');
        } else if(reg.active) {
          $rootScope.active = true;
          console.log('Service worker active');
        }

        $rootScope.updateWorker = function(){
          console.log(reg.waiting);
          reg.waiting.postMessage({action: 'skipWaiting'});
        }
        
      }).catch(function(error) {
        // registration failed
        console.log('Registration failed with ' + error);
      });

      navigator.serviceWorker.addEventListener('controllerchange', function(){
        window.location.reload();
      });
    }

  }]);
