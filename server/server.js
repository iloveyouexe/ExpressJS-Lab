const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

app.post("/contact-form", (req, res) => {
  // Advanced section, #3, this says to log these in a JSON file, but in the walkthrough we logged them in a txt file, when I logged these in a json file originally i kept getting a bunch of errors, so I figured I would just change it to txt.
  fs.appendFileSync("log.txt", `${req.body.name}\n`);
  fs.appendFileSync("log.txt", `${req.body.email}\n`);
  res.send("Thank you for submitting your contact form");
});

fs.readFile("log.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
}); // slightly confused on how to call this, without having to restart the server -- but i think i'm on the right track.

app.use((req, res, next) => {
  console.log(`${req.url}\n`);
  next();
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.use(express.static(path.join(__dirname, "../public"))); // once again, I feel like rain man with this -- coolest thing I've used so far in this section.

app.listen(3000);
