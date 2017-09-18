let express = require("express");
let bodyParser = require("body-parser");
let app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("home");
});

let friends = ["Tony", "Toby", "Miranda"];
//list of friends of which we can add using form



app.post("/addfriend", function(req, res) {
  let newFriend = req.body.name;
  friends.push(newFriend);
  res.redirect("/friends");
});

app.get("/friends", function(req, res) {
  res.render("friends", {
    friends: friends
  });
});


app.listen(process.env.PORT, process.env.IP, function() {
  console.log("Server started");
});
