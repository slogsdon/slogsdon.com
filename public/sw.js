// importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');

// self.workbox.routing.registerRoute(
//   // Cache image files
//   /.*\.(?:html|css|js|png|jpg|jpeg|svg|gif)/,
//   // Use the cache if it's available
//   workbox.strategies.cacheFirst()
// );

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('shane-logsdon-io-static-v1').then((cache) => {
      return cache.addAll([
        "/js/lib.js",
        "/"
      ]);
    })
    .catch(() => {})
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request && event.request.mode === "no-cors") { return; }

  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request, { mode: "same-origin" });
    })
    .catch(() => {})
  );
});
