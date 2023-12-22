// /* global importScripts, workbox */
// importScripts('https://storage.googleapis.com/workbox-cdn/releases/latest/workbox-sw.js');


// // eslint-disable-next-line no-restricted-globals
// workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
//  // eslint-disable-next-line no-restricted-globals
// self.addEventListener('install', (event) => {
//     event.waitUntil(
//       caches.open('todo-app-cache').then((cache) => {
//         return cache.addAll([
//           '/',
//           '/index.html',
//           '/static/js/bundle.js',
//           '/static/js/0.chunk.js',
//           '/static/js/main.chunk.js',
//           '/favicon.ico',
//           '/manifest.json',
//         ]);
//       })
//     );
//   });
//   // eslint-disable-next-line no-restricted-globals
//  self.addEventListener('fetch', (event) => {
//     event.respondWith(
//       caches.match(event.request).then((response) => {
//         return response || fetch(event.request);
//       })
//     );
//   });
// service-worker.js
/* global globalThis */
import { precacheAndRoute } from 'workbox-precaching';
// eslint-disable-next-line
const self = typeof globalThis !== 'undefined' ? globalThis : self || window;

precacheAndRoute(self.__WB_MANIFEST || []);
// eslint-disable-next-line
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('todo-app-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/static/js/bundle.js',
        '/static/js/0.chunk.js',
        '/static/js/main.chunk.js',
        '/favicon.ico',
        '/manifest.json',
      ]);
    })
  );
});
// eslint-disable-next-line
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

export function register() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/react-native-todo/src/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered:', registration);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  }
}


