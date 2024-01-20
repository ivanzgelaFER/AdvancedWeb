const express = require("express");
const path = require("path");
var cors = require("cors");

const fs = require("fs");
let jsonRecipes;
fs.readFile("exams.json", function (err, data) {
  var jsonData = data;
  jsonRecipes = JSON.parse(jsonData);
});

const app = express();
app.use(express.static('public'));
app.use(cors());

app.get("/exams", function (req, res) {
  res.json(jsonRecipes);
});
const hostname = 'localhost';
const port = 8888
app.listen(port, hostname, () => {
console.log(`Server locally running at http://${hostname}:${port}`)});
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