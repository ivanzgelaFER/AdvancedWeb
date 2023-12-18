import { del, entries } from "./idb-keyval.js";
//popis zahtjeva koji ce se inicijalno spremiti u cache
const filesToCache = [
    "/",
    "manifest.json",
    "index.html",
    "intranet.html",
    "offline.html",
    "404.html",
    "photo_studio.html",
    "/ferweb/promocije.png",
    "https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap",
    "https://fonts.gstatic.com/s/firasans/v11/va9E4kDNxMZdWfMOD5Vvl4jLazX3dA.woff2",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
];

const vrsta = "static-cache-v2";


//install + cache
self.addEventListener('install', event => {
    console.log("Installing lab5 service worker");
    event.waitUntil(
        caches.open(vrsta).then((cache) => {
            return cache.addAll(filesToCache);
        })
    );
    
});

//activate
self.addEventListener("activate", (event) => {
    console.log("Activating lab5 service worker");
    const cacheWhitelist = [vrsta];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

//fetch  
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches
            .match(event.request)
            .then((response) => {
                if (response) {
                    //return response;
                }
                return fetch(event.request).then((response) => {
                    if (response.status === 404) {
                        return caches.match("404.html");
                    }
                    return caches.open(vrsta).then((cache) => {
                        cache.put(event.request.url, response.clone());
                        return response;
                    });
                });
            })
            .catch((error) => {
                console.log("Error", event.request.url, error);
                return caches.match("offline.html");
            })
    );
});

//background sync
self.addEventListener("sync", function (event) {
    console.log("Background sync lab5!", event);
    if (event.tag === "sinkronizacija") {
        event.waitUntil(sinkroniziraj());
    }
});

self.addEventListener("notificationclick", function (event) {
    let notification = event.notification;

    event.waitUntil(
        clients.matchAll({ type: "window", includeUncontrolled: true })
            .then(function (clis) {
                if (clis && clis.length > 0) {
                    clis.forEach(async (client) => {
                        await client.navigate(notification.data.redirectUrl);
                        return client.focus();

                    });
                } else if (clients.openWindow) {
                    return clients
                        .openWindow(notification.data.redirectUrl)
                        .then((windowClient) =>
                            windowClient ? windowClient.focus() : null
                        );
                }
            }
        ));
});

self.addEventListener("notificationclose", function (event) {
    console.log("notificationclose", event);
});

self.addEventListener("push", function (event) {
    console.log("push event", event);

    var data = { title: "title", body: "body", redirectUrl: "/" };

    if (event.data) {
        data = JSON.parse(event.data.text());
    }

    var options = {
        body: data.body,
        vibrate: [200, 100, 200, 100, 200, 100, 200],
        data: {
            redirectUrl: data.redirectUrl,
        },
    };

    event.waitUntil(self.registration.showNotification(data.title, options));
});

let sinkroniziraj = async function () {
    entries().then((entries) => {
        entries.forEach((entry) => {
            let snap = entry[1];
            let formData = new FormData();
            formData.append("id", snap.id);
            formData.append("ts", snap.ts);
            formData.append("title", snap.title);
            formData.append("image", snap.image, snap.id + ".png");

            fetch("/pohraniSliku", {
                method: "POST",
                body: formData,
            })
                .then(function (res) {
                    if (res.ok) {
                        res.json().then(function (data) {
                            console.log("Deleting from idb:", data.id);
                            del(data.id);
                        });
                    } else {
                        console.log(res);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        });
    });
};