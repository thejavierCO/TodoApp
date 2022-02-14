var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/index.html',
  '/src/css/styles.css',
  '/src/js/jquery.min.js',
  '/src/js/main.js',
  '/src/js/TodoApp.js',
  '/src/js/sw.js'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            console.log('Opened cache');
            cache.addAll(urlsToCache)
        })
    );
});