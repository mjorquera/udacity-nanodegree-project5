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
        templateUrl: 'views/flights.html',
        controller: 'FlightCtrl as flight'
      });

    $indexedDBProvider
      .connection('flight-app')
      .upgradeDatabase(1, function(event, db, tx){
        console.log(db);
        // TODO: add objectstore
        // var objStore = db.createObjectStore('stations', {autoIncrement: true});
        // objStore.createIndex('code_idx', 'station_code', {unique: true});

      });
  }]);
