const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css', // Sprawdź nazwę pliku
  '/menu.js',
  '/manifest.json',
  '/podfoldern/images/logo/Stripe Climate Badge - Small.png',
  '/podfoldern/images/logo/Stripe Climate icon - Big.png',
  '/fallback.html' // plik istniejacy w razie braku internetu
];

// Instalowanie service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Obsługa fetch
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request).catch(() => {
          return caches.match('fallback.html'); // Upewnij się, że ten plik istnieje
        });
      })
  );
});

// Aktualizacja service worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});