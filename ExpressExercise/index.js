let express = require('express');

let app = express();

// '/' should return Hi there, welcome to my assignment!
// '/speak/pig' The pig says Oink
// '/speak/cow' The cow says Moo
// '/speak/dog' the dog say woof woof

// /repeat/:word/:numTimes

// else Page not found

let pig = {
  name: "pig",
  word: "Oink"
};

let cow = {
  name: "cow",
  word: "Moo"
};

let dog = {
  name: "dog",
  word: "Woof woof"
};

let animals = [pig, cow, dog];
app.get("/", function(req, res) {
  res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal", function(req, res) {
  let animal;
  //search for animal
  for (var i = 0; i < animals.length; i++) {
    if (animals[i].name == req.params.animal) {
      animal = animals[i];
    }
  }

  res.send("The " + animal.name + " says " +
    "'" + animal.word + "'");
});

// repeat/:word/:numTimes

app.get("/repeat/:word/:numTimes", function(req, res) {
  let word = req.params.word;
  let numTimes = parseInt(req.params.numTimes);
  if (typeof numTimes == "number") {
    word = word.repeat(numTimes);
  }
  else {
    res.send("numTimes is invalid");
  }

  res.send(word);
});

app.get("*", function(req, res) {
  res.send("Sorry, page not found.");
})

app.listen(process.env.PORT, process.env.IP, function() {
  console.log("Server Started");
});
