let express = require("express");

let app = express();


app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  // res.render(fileName)
  res.render("home");
  //res.send("Home page");
});

app.get("/fallinlovewith/:thing", function(req, res) {
  let thing = req.params.thing;
  res.render("love", {
    thingVar: thing
  });
});

app.get("/post", function(req, res) {
  let posts = [
    { title: "post 1", author: "Suzy" },
    { title: "big blick", author: "Charles" },
    { title: "bunny bitch", author: "Bruh" },
    { title: "trick daddy", author: "Big Daddy" }
  ];
  res.render("posts", { posts: posts });
})

// /fallinlovewith/rusty :name


app.listen(process.env.PORT, process.env.IP, function() {
  console.log("Server started");
});
