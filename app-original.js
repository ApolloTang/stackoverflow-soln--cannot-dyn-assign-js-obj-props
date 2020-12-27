const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

let participantsObject = {};
let participantsArray = [];
let randomNumber;

app.get("/new", function(req, res) {
  res.sendFile(__dirname + "/new.html");
});

app.post("/new", function(req, res) {
  participantsObject[req.body.person] = {};
  participantsArray.push(req.body.person);
  res.redirect("/new");
});

app.get("/setup", function() {
  let size = participantsArray.length;
  let participantsWithoutAGifter = participantsArray;

  for (var i = 0; i < size; i++) {
    randomNumber = Math.floor(Math.random() * participantsWithoutAGifter.length)
    participantsObject[participantsArray[i]]["friend"] = participantsWithoutAGifter[randomNumber];
    participantsWithoutAGifter.splice(randomNumber, 1);
  }

  console.log(participantsObject);

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
