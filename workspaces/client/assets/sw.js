// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

self.addEventListener('install', (ev) => {
  ev.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (ev) => {
  ev.waitUntil(self.clients.claim());
});
