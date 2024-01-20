const express = require("express");
const path = require("path");
var cors = require("cors");

const fs = require("fs");
let jsonExams;
fs.readFile("exams.json", function (err, data) {
  var jsonData = data;
  jsonExams = JSON.parse(jsonData);
});

const app = express();
app.use(express.static('public'));
app.use(cors());

app.get("/exams", async function (req, res) {
  res.json(jsonExams);
});
 
/*
app.listen(8888, "localhost", function () {
  console.log(
    "Server listening on http://%s:%d in %s mode...",
    this.address().address,
    this.address().port,
    app.settings.env
  );
});
*/

const externalUrl = process.env.RENDER_EXTERNAL_URL;
const port = externalUrl && process.env.PORT ? parseInt(process.env.PORT) : 8080;
if (externalUrl) {
  const hostname = '0.0.0.0';
  app.listen(port, hostname, () => {
    console.log(`Server locally running at http://${hostname}:${port}/ and from outside on ${externalUrl}`);
})} else {  
    const hostname = 'localhost';
    app.listen(port, hostname, () => {
    console.log(`Server locally running at http://${hostname}:${port}`);
  })
}