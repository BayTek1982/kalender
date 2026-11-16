// Kalender: funktioniert auch ohne Internet (zuerst Netz, sonst gespeicherte Kopie)
const NAME = "kalender-v2";
self.addEventListener("install", e => { self.skipWaiting(); e.waitUntil(caches.open(NAME).then(c => c.addAll(["./", "manifest.webmanifest", "icons/icon-192.png"]).catch(() => {}))); });
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(r => { const k = r.clone(); caches.open(NAME).then(c => c.put(e.request, k)); return r; }).catch(() => caches.match(e.request, { ignoreSearch: true })));
});
self.addEventListener("notificationclick", e => { e.notification.close(); e.waitUntil(self.clients.matchAll({ type: "window" }).then(l => l.length ? l[0].focus() : self.clients.openWindow("./"))); });
