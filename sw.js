// 离线缓存：让 App 装到主屏幕后没网也能开
const CACHE = "spelling-star-v1";
const FILES = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const url = e.request.url;
  // OCR 请求永远走网络，不缓存
  if (url.includes("googleapis.com")) return;
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).catch(() => caches.match("./index.html"))));
});
