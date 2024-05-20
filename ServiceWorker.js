const cacheName = "RayYard-SixteenBeads-1.0";
const contentToCache = [
    "Build/9853637125e801e9aae48e78dbbdcfca.loader.js",
    "Build/45e4b13b9211f636a649f525703d63a5.framework.js.unityweb",
    "Build/baefd5e1b23e034348094333a241cf2c.data.unityweb",
    "Build/8363b4628ef3452f4a974993678ccd5c.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
