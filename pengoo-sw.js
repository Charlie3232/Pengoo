const CACHE_VERSION = 'pengoo-cache-v1';
const IMAGE_CACHE = `${CACHE_VERSION}-images`;
const SHELL_CACHE = `${CACHE_VERSION}-shell`;
const SHELL_ASSETS = [
  './app-transition.js',
  './firebase-config.js',
  './image-utils.js',
  './dev-impersonation.js',
  './quiz-bank.js',
  './quiz-scoring.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then(cache => cache.addAll(SHELL_ASSETS))
      .catch(() => null)
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys
        .filter(key => key.startsWith('pengoo-cache-') && !key.startsWith(CACHE_VERSION))
        .map(key => caches.delete(key))
    ))
  );
  self.clients.claim();
});

function isImageRequest(request){
  const url = new URL(request.url);
  return request.destination === 'image'
    || url.hostname.includes('firebasestorage.googleapis.com')
    || url.hostname.includes('storage.googleapis.com')
    || url.hostname.includes('googleusercontent.com');
}

function isShellAsset(request){
  const url = new URL(request.url);
  return url.origin === self.location.origin && SHELL_ASSETS.some(asset => url.pathname.endsWith(asset.replace('./', '/')));
}

async function cacheFirst(request, cacheName){
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if(cached) return cached;
  const response = await fetch(request);
  if(response && (response.ok || response.type === 'opaque')){
    cache.put(request, response.clone()).catch(() => null);
  }
  return response;
}

async function staleWhileRevalidate(request, cacheName){
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const fresh = fetch(request).then(response => {
    if(response && (response.ok || response.type === 'opaque')){
      cache.put(request, response.clone()).catch(() => null);
    }
    return response;
  }).catch(() => cached);
  return cached || fresh;
}

self.addEventListener('fetch', event => {
  const { request } = event;
  if(request.method !== 'GET') return;

  if(isImageRequest(request)){
    event.respondWith(cacheFirst(request, IMAGE_CACHE));
    return;
  }

  if(isShellAsset(request)){
    event.respondWith(staleWhileRevalidate(request, SHELL_CACHE));
  }
});
