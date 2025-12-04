/* FruitSeeker service worker v6 */
const CACHE_NAME="fruitseeker-v6";
const ASSETS=["./","./index.html","./manifest.webmanifest","./assets/icon-192.png","./assets/icon-512.png","./js/app.js","./js/db.js","./js/csv.js"];
self.addEventListener("install",e=>{e.waitUntil((async()=>{const c=await caches.open(CACHE_NAME);await c.addAll(ASSETS);self.skipWaiting();})())});
self.addEventListener("activate",e=>{e.waitUntil((async()=>{const ks=await caches.keys();await Promise.all(ks.map(k=>k!==CACHE_NAME?caches.delete(k):Promise.resolve()));self.clients.claim();})())});
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);if(u.origin===self.location.origin){e.respondWith((async()=>{const m=await caches.match(e.request);if(m) return m;try{const r=await fetch(e.request);if(e.request.method==="GET"&&r&&r.status===200){const c=await caches.open(CACHE_NAME);c.put(e.request,r.clone());}return r;}catch(err){return m||new Response("Offline",{status:503,statusText:"Offline"});}})())}});
