this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        /*'./src/routing.js',*/
        './example/lavosted.min.js',
        './public/css/bootstrap.min.css',
        './public/js/bootstrap.bundle.min.js',
      ]);
    })
  );
});