var self = this;
var staticCacheName = 'flight-app-v1';

//Add cache on installation
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        '/index.html',
        '/styles/main.css',
        '/styles/font-awesome.min.css',
        '/scripts/app.js',
        '/scripts/controllers/airport.js',
        '/scripts/controllers/flight.js',
        '/scripts/services/airportfinder.js',
        '/scripts/services/flightfinder.js',
        '/scripts/filters/flightstatus.js',
        '/scripts/filters/minhour.js',
        '/views/airport.html',
        '/views/flights.html',
        '/bower_components/jquery/dist/jquery.js',
        '/bower_components/angular/angular.js',
        '/bower_components/bootstrap/dist/js/bootstrap.js',
        '/bower_components/angular-ui-router/release/angular-ui-router.js',
        '/bower_components/leaflet/dist/leaflet-src.js',
        '/bower_components/angular-leaflet-directive/dist/angular-leaflet-directive.js',
        '/bower_components/angular-fontawesome/dist/angular-fontawesome.js',
        '/bower_components/bootstrap/dist/css/bootstrap.css',
        '/bower_components/leaflet/dist/leaflet.css',
        '/bower_components/angular-indexedDB/angular-indexed-db.js'
      ]);
    })
  );
});

//delete previous caches for the app
self.addEventListener('activate', function(event){
  event.waitUntil(
    caches.keys().then(function(cacheNames){
      return Promise.all(
        cacheNames.filter(function(cacheName){
          return cacheName.startsWith('flight-app') && 
            cacheName != staticCacheName;
        }).map(function(cacheName){
          console.log('deleting cache: ' + cacheName);
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(resp) {
      return resp || fetch(event.request).then(function(response) {
        // caches.open('v1').then(function(cache) {
        //   cache.put(event.request, response.clone());
        // });
        return response;
      });
    }).catch(function() {
      return caches.match('/images/yeoman.png');
    })
  );
});

self.addEventListener('message', function(event) {
  if (event.data.action == 'skipWaiting'){
    self.skipWaiting();
  }
});