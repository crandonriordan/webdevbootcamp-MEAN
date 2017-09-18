let express = require("express");

var app = express();

// "/" => "Hi there!"
app.get("/", function(req, res) {
  res.send("Hi there!");
  console.log("Someone connected")
})
// "/bye" => "Goodbye!"
app.get("/bye", function(req, res) {
  res.send("Goodbye!");
})
// "/dog" => "Woof!"
app.get("/dog", function(req, res) {
  res.send("Woof!");
})

app.get("/r/:subredditName", function(req, res) {
  res.send("subreddit");
})

app.get("/r/:subredditName/comments/:id/:title", function(req, res) {
  let subreddit = req.params.subredditName;

  res.send("Welcome to the " + subreddit.toUpperCase() + " SUBREDDIT");
})

app.get("*", function(req, res) {
  res.send("You're a star");
})

app.listen(process.env.PORT, process.env.IP, function() {
  console.log("Server Started");
});
