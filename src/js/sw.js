self.addEventListener("fetch",(e)=>{console.log(e)})

self.addEventListener('install', function(event) {
    console.log(event)
    // event.waitUntil(
    //     caches.open(CACHE_NAME).then(cache=>cache.addAll(urlsToCache))
    // );
});
