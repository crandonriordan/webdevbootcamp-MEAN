let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app")

let catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  mood: String
});
//took catSchema and compiled to model Cat
let Cat = mongoose.model("Cat", catSchema); //pluralizes too collection cats

//add new cat to db
// let george = new Cat({
//   name: "Mrs. Norris",
//   age: 17,
//   mood: "evil"
// });

// george.save(function(err, cat) {
//   if (err) {
//     console.log(err);
//   }
//   else {
//     console.log("Saved cat to DB");
//     console.log(cat);
//   }
// });

Cat.create({
  name: "Bobby",
  age: 15,
  mood: "nice"
}, function(err, cat) {
  if (err) {
    console.log(err);
  }
  else {
    console.log(cat.name, "created")
  }
});

//retrieve all cats from db and console.log

Cat.find({}, function(err, cats) {
  if (err) {
    console.log(err);
  }
  else {
    console.log("All Cats");
    console.log(cats);
  }
})
