let btnNotif = document.getElementById("notific");

if ("serviceWorker" in navigator && "Notification" in window) {

    btnNotif.addEventListener("click", function () {
        Notification.requestPermission(async function (res) {
            if (res === "granted") {
                await setupPushSubscription();
            } else {
                console.log("Korisnik je odbio primati notifikacije:", res);
            }
        });
    });
} else {
    btnNotif.setAttribute("disabled", "");
    btnNotif.classList.add("btn-outline-danger");
}

function urlBase64ToUint8Array(base64String) {
    var padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, "+")
        .replace(/_/g, "/");

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

async function setupPushSubscription() {
    try {
        let reg = await navigator.serviceWorker.ready;
        let sub = await reg.pushManager.getSubscription();
        if (sub === null) {
            var publicKey =
                "BLCoHZI6x0-BCRYt508t0ZJmI9S4qWrIEy99lZ2lnNjbM7ttEM472g0Pc2IO6tkGUeiJFyytvqCyl4ssFVDXiek";
            sub = await reg.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(publicKey)
            });
            let res = await fetch("/saveSubscription", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({ sub }),
            });
            if (res.ok) {
                alert(
                    "Pretplata je generirana i spremljena!"
                );
            }
        } else {
            alert("Već ste pretplaćeni!");
        }
    } catch (error) {
        console.log(error);
    }
}
