const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const fse = require('fs-extra');
const httpPort = 80;
const webpush = require('web-push');
const NOVE_SLIKE = path.join(__dirname, "public", "uploads");  

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

var pohrani = multer({
    storage:  multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, NOVE_SLIKE);
        },
        filename: function (req, file, cb) {
            let fn = file.originalname.replaceAll(":", "-");
            cb(null, fn);
        },
    })
}).single("image");


app.post("/pohraniSliku",  function (req, res) {
    pohrani(req, res, async function(err) {
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
            await pushNotifikacija(req.body.title);
        }
    });
});



app.get("/snaps", function (req, res) {
    let files = fse.readdirSync(NOVE_SLIKE);
    files = files.reverse().slice(0, 10);
    console.log("In", NOVE_SLIKE, "there are", files);
    res.json({
        files
    });
});


let subscriptions = [];
const PRETPLATE = 'pretplate.json';

try {
    subscriptions = JSON.parse(fs.readFileSync(PRETPLATE));
} catch (error) {
    console.error(error);    
}

app.post("/saveSubscription", function(req, res) {
    let sub = req.body.sub;
    subscriptions.push(sub);
    fs.writeFileSync(PRETPLATE, JSON.stringify(subscriptions));
    res.json({
        success: true
    });
});

async function pushNotifikacija(snapTitle) {

    webpush.setVapidDetails('mailto:ivan.zgela@gmail.com', 
    'BLCoHZI6x0-BCRYt508t0ZJmI9S4qWrIEy99lZ2lnNjbM7ttEM472g0Pc2IO6tkGUeiJFyytvqCyl4ssFVDXiek', 
    'ZeINuYLv26FhUplmi-oUmZeebzBsxpMvvTBBC8-DePg');

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

