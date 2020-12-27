// from:
// https://stackoverflow.com/questions/65470491/cant-dynamically-assign-js-object-property#65470491

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
  participantsObject[req.body.person] = {'foo': 'foo'};
  participantsArray.push(req.body.person);
  res.redirect("/new");
});

app.get("/setup", function() {
  let size = participantsArray.length;
  let participantsWithoutAGifter = participantsArray;

  for (var i = 0; i < size; i++) {
    randomNumber = Math.floor(Math.random() * participantsWithoutAGifter.length)

    // participantsObject[participantsArray[i]]["friend"] = participantsWithoutAGifter[randomNumber]; // <-- this will not work

    const newProperty = 'friend'
    participantsObject[participantsArray[i]] = {
      ...participantsObject[participantsArray[i]],  // <-- so that you don't lose other perperties
      [newProperty]: participantsWithoutAGifter[randomNumber]
    }

    // const newProperty = 'friend'
    // const source = {}
    // source[newProperty] = participantsWithoutAGifter[randomNumber]
    // Object.assign(participantsObject[participantsArray[i]], source )

    // participantsWithoutAGifter.splice(randomNumber, 1);
  }

  console.log(participantsObject);

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
