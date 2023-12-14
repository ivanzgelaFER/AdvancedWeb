const filesToCache = [
    "/",
    "manifest.json",
    "index.html",
    "offline.html",
    "404.html",
    "https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap",
    "https://fonts.gstatic.com/s/firasans/v11/va9E4kDNxMZdWfMOD5Vvl4jLazX3dA.woff2",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
];

const staticCacheName = "static-cache-v2";

//install
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(staticCacheName).then((cache) => {
            return cache.addAll(filesToCache);
        })
    );
});

//activate
self.addEventListener('activate', event => {

});

//fetch
self.addEventListener('fetch', event => {
 
});

//sync
self.addEventListener("sync", function (event) {
    console.log("Background sync!", event);
    if (event.tag === "sync-snaps") {
        event.waitUntil(syncSnaps());
    }
});