const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const fse = require('fs-extra');
const httpPort = 80;
const webpush = require('web-push');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    console.log(new Date().toLocaleString() + " " + req.url);
    next();
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

const UPLOAD_PATH = path.join(__dirname, "public", "uploads");

var uploadSnaps = multer({
    storage:  multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, UPLOAD_PATH);
        },
        filename: function (req, file, cb) {
            let fn = file.originalname.replaceAll(":", "-");
            cb(null, fn);
        },
    })
}).single("image");

app.post("/saveSnap",  function (req, res) {
    uploadSnaps(req, res, async function(err) {
        if (err) {
            console.log(err);
            res.json({
                success: false,
                error: {
                    message: 'Upload failed:: ' + JSON.stringify(err)
                }
            });
        } else {
            res.json({ success: true, id: req.body.id });
            await sendPushNotifications(req.body.title);
        }
    });
});
app.get("/snaps", function (req, res) {
    let files = fse.readdirSync(UPLOAD_PATH);
    files = files.reverse().slice(0, 10);
    console.log("In", UPLOAD_PATH, "there are", files);
    res.json({
        files
    });
});


let subscriptions = [];
const SUBS_FILENAME = 'pretplate.json';

try {
    subscriptions = JSON.parse(fs.readFileSync(SUBS_FILENAME));
} catch (error) {
    console.error(error);    
}

app.post("/saveSubscription", function(req, res) {
    let sub = req.body.sub;
    subscriptions.push(sub);
    fs.writeFileSync(SUBS_FILENAME, JSON.stringify(subscriptions));
    res.json({
        success: true
    });
});

async function sendPushNotifications(snapTitle) {

    webpush.setVapidDetails('mailto:ivan.zgela@fer.hr', 
    'BL1oXiSXCjKRPParkSNUP7ik7Ltl3RpPUxurkh7ro4rdpNLylON7f3xxZryBF_xN8CqxvemlVdT2EJGH33qe5iw', 
    '4B9u-sA9uJ8zISw3FXlsbbsaVixK3NJn6o_BZshEZnI');

    subscriptions.forEach(async sub => {
        try {
            await webpush.sendNotification(sub, JSON.stringify({
                title: 'Nova slika za iksicu uslikana',
                body: 'Uslikana je slika pod nazivom: ' + snapTitle,
                redirectUrl: '/intranet.html'
              }));    
        } catch (error) {
            console.error(error);
        }
    });
}


app.listen(httpPort, function () {
    console.log(`HTTP listening on port: ${httpPort}`);
});

