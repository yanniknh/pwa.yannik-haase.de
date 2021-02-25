const CACHE_NAME = 'v1';
/* Event listener for installation of service worker, caches the page */
self.addEventListener('install', function (evt) {
    evt.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll([
                "/",
                "/index.html",
                "/css/style.min.css",
                "/images/wifi-offline.svg",
                "/images/pwa-light.svg",
                "/images/pwa-512x512.png",
                "/images/pwa-192x192.png",
                "/images/pwa-96x96.png",
                "/js/webrtc-adapter.min.js",
                "/favicon.ico"
            ]);
        })
    );
});
/* Event listener for fetch event that might provide a cached version of the PWA if network request fails */
self.addEventListener('fetch', function (evt) {
    evt.respondWith(
        fetch(evt.request).catch(function () {
            return caches.match(evt.request);
        })
    );
});
/* Event listener for notification interactions */
self.addEventListener('notificationclick', function (e) {
    if (e.action === 'openPwa') {
        clients.openWindow('https://pwa.yannik-haase.de');
    }
    e.notification.close();
});
