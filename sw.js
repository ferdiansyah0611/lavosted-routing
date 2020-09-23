this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        './src/routing.js',
        './example/lavosted.min.js',
        'https://cdn.jsdelivr.net/npm/bulma@0.9.0/css/bulma.min.css',
      ]);
    })
  );
});