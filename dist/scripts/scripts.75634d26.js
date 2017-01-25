"use strict";angular.module("flightApp",["ui.router","leaflet-directive","picardy.fontawesome","indexedDB"]).config(["$stateProvider","$urlRouterProvider","$indexedDBProvider",function(a,b,c){b.otherwise("/"),a.state("home",{url:"/",templateUrl:"views/airport.html",controller:"AirportCtrl as airport"}).state("flights",{url:"/flights/:airportId",templateUrl:"views/flights.html",controller:"FlightCtrl as flights"}),c.connection("flight-app").upgradeDatabase(1,function(a,b,c){console.log(b);b.createObjectStore("airports",{keyPath:"iata"})})}]).run(["$rootScope",function(a){"serviceWorker"in navigator&&(navigator.serviceWorker.register("/sw.js").then(function(b){a.installing=!1,a.waiting=!1,a.active=!1,b.installing?(a.installing=!0,console.log("Service worker installing")):b.waiting?(a.waiting=!0,console.log("Service worker installed")):b.active&&(a.active=!0,console.log("Service worker active")),a.updateWorker=function(){console.log(b.waiting),b.waiting.postMessage({action:"skipWaiting"})}})["catch"](function(a){console.log("Registration failed with "+a)}),navigator.serviceWorker.addEventListener("controllerchange",function(){window.location.reload()}))}]),angular.module("flightApp").controller("FlightCtrl",["$stateParams","airportFinder","flightFinder","leafletBoundsHelpers",function(a,b,c,d){var e=this,f=new Date;e.yearQuery=f.getFullYear(),e.monthQuery=f.getMonth()+1,e.dayQuery=f.getDate(),e.hourQuery=f.getHours(),e.airportId=a.airportId,e.markers=[],e.paths=[],b.getAirport(e.airportId).then(function(a){e.airport=a,g(e.airport)}),c.getDepartureFlightsByAirport(e.airportId,e.yearQuery,e.monthQuery,e.dayQuery,e.hourQuery).then(function(a){e.flightResults=a}),e.mapcenter={lat:0,lng:0,zoom:4};var g=function(a){if(a.lat&&a.lon){var b={id:a.iata,lat:parseFloat(a.lat),lng:parseFloat(a.lon),message:a.name+" ("+a.iata+")",draggable:!1,focus:!0};e.mapcenter.lat=b.lat,e.mapcenter.lng=b.lng,e.markers.push(b)}},h=function(a){if(a.latitude&&a.longitude){var b={id:a.iata,lat:parseFloat(a.latitude),lng:parseFloat(a.longitude),message:a.name+" ("+a.iata+")",draggable:!1,focus:!0};e.markers.push(b)}},i=function(a){e.paths={p1:{color:"#3c9bc7",weight:3,dashArray:"5,5",latlngs:[{lat:parseFloat(e.airport.lat),lng:parseFloat(e.airport.lon)},{lat:parseFloat(a.latitude),lng:parseFloat(a.longitude)}]}},e.bounds=d.createBoundsFromArray([[parseFloat(e.airport.lat),parseFloat(e.airport.lon)],[parseFloat(a.latitude),parseFloat(a.longitude)]])};e.getAirportAppendix=function(a){return e.flightResults.appendix.airports.filter(function(b){return b.fs==a})[0]},e.getAirlineAppendix=function(a){return e.flightResults.appendix.airlines.filter(function(b){return b.fs==a})[0]},e.getStatusClass=function(a){var b;switch(a){case"A":b="label-primary";break;case"C":b="label-danger";break;case"D":case"R":b="label-info";break;case"L":case"S":b="label-success";break;case"NO":b="label-warning";break;default:b="label-default"}return b},e.selectFlight=function(a){e.selectedFlight=e.flightResults.flightStatuses.filter(function(b){return b.flightId==a})[0];var b=e.getAirportAppendix(e.selectedFlight.arrivalAirportFsCode);e.markers.length>1&&e.markers.pop(),h(b),i(b)}}]),angular.module("flightApp").service("airportFinder",["$indexedDB",function(a){this.getCountries=function(){return $.get("/data/countries.json")},this.getAirports=function(a){return $.get("/data/airports.json").then(function(b){return b.filter(function(b){return b.iso==a&&null!=b.name})})},this.getAirport=function(a){return $.get("/data/airports.json").then(function(b){return b.filter(function(b){return b.iata==a})[0]})}}]),angular.module("flightApp").controller("AirportCtrl",["airportFinder",function(a){var b=this;b.mapcenter={lat:51.498395,lng:-.120857,zoom:5},b.markers=[],a.getCountries().then(function(a){b.countries=a}),b.selectCountry=function(){b.selectedAirportCode=null,a.getAirports(b.selectedCountry).then(function(a){b.airports=a})},b.selectAirport=function(){b.selectedAirport=b.airports.filter(function(a){return a.iata==b.selectedAirportCode})[0],c(b.selectedAirport)};var c=function(a){if(a.lat&&a.lon){var c={id:a.iata,lat:parseFloat(a.lat),lng:parseFloat(a.lon),message:a.name+" ("+a.iata+")",draggable:!1,focus:!0};b.mapcenter.lat=c.lat,b.mapcenter.lng=c.lng,console.log(c),b.markers.push(c)}}}]),angular.module("flightApp").service("flightFinder",function(){var a="14d7fd85",b="d12d06df7b12bd6c59a69b3aaef0f348",c="https://api.flightstats.com/flex/flightstatus/rest/v2/jsonp/";this.getDepartureFlightsByAirport=function(d,e,f,g,h){var i=c+"airport/status/"+d+"/dep/"+e+"/"+f+"/"+g+"/"+h;i+="?appId="+a+"&appKey="+b+"&utc=false&numHours=2&maxFlights=20";return $.ajax({url:i,dataType:"jsonp",jsonpCallback:"results"})}}),angular.module("flightApp").filter("flightStatus",function(){return function(a){var b;switch(a){case"A":b="Active";break;case"C":b="Canceled";break;case"D":b="Diverted";break;case"DN":b="Data source needed";break;case"L":b="Landed";break;case"NO":b="Not Operational";break;case"R":b="Redirected";break;case"S":b="Scheduled";break;default:b="Unknown"}return b}}),angular.module("flightApp").filter("minHour",function(){return function(a){var b=Math.floor(a/60),c=a%60;return 0==b?c+" min":1==b?b+" hr "+c+" min":b+" hrs "+c+" min"}}),angular.module("flightApp").run(["$templateCache",function(a){a.put("views/airport.html",'<div class="row"> <div class="col-sm-6"> <form> <div class="form-group"> <label><span ng-hide="airport.countries"><fa name="refresh" spin></fa></span> Country</label> <select class="form-control" ng-model="airport.selectedCountry" ng-change="airport.selectCountry()"> <option value="" disabled selected>(Select Country)</option> <option ng-repeat="option in airport.countries | orderBy: \'name\'" ng-value="option.code">{{option.name}}</option> </select> </div> <div class="form-group"> <label><span ng-show="!airport.airports && airport.selectedCountry"><fa name="refresh" spin></fa></span> Airport</label> <select class="form-control" ng-model="airport.selectedAirportCode" ng-disabled="!airport.selectedCountry" ng-change="airport.selectAirport()"> <option value="" disabled selected>(Select Airport)</option> <option ng-repeat="option in airport.airports | orderBy: \'name\'" ng-value="option.iata">{{option.name}}</option> </select> </div> </form> </div> <div class="col-sm-6" ng-show="airport.selectedAirportCode"> <table class="table table-striped table-condensed table-bordered"> <tr> <th>Code</th> <td>{{airport.selectedAirport.iata}}</td> </tr> <tr> <th>Name</th> <td>{{airport.selectedAirport.name}}</td> </tr> <tr> <th>Lat</th> <td>{{airport.selectedAirport.lat}}</td> </tr> <tr> <th>Lon</th> <td>{{airport.selectedAirport.lon}}</td> </tr> <tr> <th>Size</th> <td>{{airport.selectedAirport.size}}</td> </tr> </table> <div class="text-center margin-bottom"> <a class="btn btn-xs btn-primary" ui-sref="flights({airportId: airport.selectedAirport.iata})"><fa name="plane"></fa> View departure fligths</a> </div> </div> </div> <div class="row"> <div class="col-sm-12"> <leaflet center="airport.mapcenter" markers="airport.markers" height="480px" style="width:100%"></leaflet> </div> </div>'),a.put("views/flights.html",'<div class="row"> <div class="col-sm-12"> <h3>Departure Flights for <b>{{ flights.airport.name }}</b> <small>{{flights.airportId}}</small></h3> <hr> </div> </div> <div class="row"> <div class="col-sm-7"> <h4><fa name="plane"></fa> Departures</h4> <div ng-show="flights.flightResults" class="pull-right"><small>{{flights.yearQuery}}/{{flights.monthQuery}}/{{flights.dayQuery}} from {{flights.hourQuery}} to {{flights.hourQuery + 2}}</small></div> <div ng-hide="flights.flightResults" class="text-center margin-top-3x"><fa name="refresh" size="4" spin></fa></div> <table ng-show="flights.flightResults" class="table table-condensed table-hover"> <thead> <tr> <th></th> <th>Flight</th> <th>Operator</th> <th>Destination</th> <th>Departure</th> <th>Arrives at</th> <th>Duration</th> <th>Status</th> </tr> </thead> <tbody> <tr class="pointer" ng-repeat="flightStatus in flights.flightResults.flightStatuses | orderBy: \'departureDate.dateLocal\'" ng-click="flights.selectFlight(flightStatus.flightId)" ng-class="{\'info\': flightStatus.flightId == flights.selectedFlight.flightId}"> <td><img class="airline-logo" ng-src="http://0.omg.io/wego/image/upload/c_fit,w_200,h_70/flights/airlines_rectangular/{{flightStatus.carrierFsCode}}.png"></td> <td>{{flightStatus.carrierFsCode + flightStatus.flightNumber}}</td> <td>{{flights.getAirlineAppendix(flightStatus.carrierFsCode).name}}</td> <td><small>({{flightStatus.arrivalAirportFsCode}})</small> {{flights.getAirportAppendix(flightStatus.arrivalAirportFsCode).city}}</td> <td>{{flightStatus.departureDate.dateLocal | date: "hh:mma"}}</td> <td>{{flightStatus.arrivalDate.dateLocal | date: "hh:mma"}}</td> <td><small>{{flightStatus.flightDurations.scheduledBlockMinutes | minHour}}</small></td> <td class="text-center"><span class="label" ng-class="flights.getStatusClass(flightStatus.status)">{{flightStatus.status | flightStatus}}</span></td> </tr> </tbody> </table> <div class="text-center" ng-show="flights.flightResults.flightStatuses && flights.flightResults.flightStatuses.length == 0"> No flights found for the next hours. Please select other airport <a ui-sref="home">here</a> </div> </div> <div class="col-sm-5"> <leaflet center="flights.mapcenter" markers="flights.markers" paths="flights.paths" bounds="flights.bounds" height="480px" style="width:100%"></leaflet> <div ng-show="flights.selectedFlight" class="margin-top"> <h4> <img class="airline-logo" ng-src="http://0.omg.io/wego/image/upload/c_fit,w_200,h_70/flights/airlines_rectangular/{{flights.selectedFlight.carrierFsCode}}.png"> {{flights.selectedFlight.carrierFsCode + flights.selectedFlight.flightNumber}} to <small>({{flights.selectedFlight.arrivalAirportFsCode}})</small> {{flights.getAirportAppendix(flights.selectedFlight.arrivalAirportFsCode).city}}, {{flights.getAirportAppendix(flights.selectedFlight.arrivalAirportFsCode).countryName}} </h4> <hr> <table class="table table-striped table-condensed table-bordered"> <tr> <th>Status</th> <td><span class="label" ng-class="flights.getStatusClass(flights.selectedFlight.status)">{{flights.selectedFlight.status | flightStatus}}</span></td> </tr> <tr> <th>Departure</th> <td>{{flights.selectedFlight.departureDate.dateLocal | date: "hh:mma"}}</td> </tr> <tr> <th>Arrival</th> <td>{{flights.selectedFlight.arrivalDate.dateLocal | date: "hh:mma"}}</td> </tr> <tr> <th>Duration</th> <td>{{flights.selectedFlight.flightDurations.scheduledBlockMinutes | minHour}}</td> </tr> <tr> <th>Terminal</th> <td>{{flights.selectedFlight.airportResources.departureTerminal || "-"}}</td> </tr> <tr> <th>Gate</th> <td>{{flights.selectedFlight.airportResources.arrivalTerminal || "-"}}</td> </tr> </table> </div> </div> </div>')}]);