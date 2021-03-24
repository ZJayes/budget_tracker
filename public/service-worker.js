const FILES_TO_CACHE = [
    "/",
    "index.html",
    "styles.css",
    "dist/bundle.js",
    "dist/mainfest.json",
    "dist/icon-192x192.png",
    "dist/icon-512x512.png"
]


//what do i put here
const BUDGET_CACHE = "budget-cache-v1";
const RUNTIME = "runtime";


//add event listenersself.addEventListener('activate', (event) => {
    self.addEventListener('activate', (event) => {
        const currentCaches = [BUDGET_CACHE, RUNTIME];
        event.waitUntil(
          caches
            .keys()
            .then((cacheNames) => {
              return cacheNames.filter((cacheName) => !currentCaches.includes(cacheName));
            })
            .then((cachesToDelete) => {
              return Promise.all(
                cachesToDelete.map((cacheToDelete) => {
                  return caches.delete(cacheToDelete);
                })
              );
            })
            .then(() => self.clients.claim())
        );
      });

self.addEventListener('fetch', (event) => {
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME).then((cache) => {
          return fetch(event.request).then((response) => {
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  }
});
