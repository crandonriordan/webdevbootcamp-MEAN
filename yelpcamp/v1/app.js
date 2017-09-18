let express = require("express");
let bodyParser = require("body-parser");
let app = express();

let campgrounds = [
  { name: "Sandwich Creek", image: "https://cdn.pixabay.com/photo/2017/07/17/16/04/turkey-2512898_960_720.jpg" },
  { name: "Sandwich Creek", image: "https://cdn.pixabay.com/photo/2017/07/17/16/04/turkey-2512898_960_720.jpg" },
  { name: "Sandwich Creek", image: "https://cdn.pixabay.com/photo/2017/07/17/16/04/turkey-2512898_960_720.jpg" },
  { name: "Prep Niagro", image: "https://cdn.pixabay.com/photo/2017/07/01/12/32/tent-2461376_960_720.jpg" },
  { name: "Prep Niagro", image: "https://cdn.pixabay.com/photo/2017/07/01/12/32/tent-2461376_960_720.jpg" },
  { name: "Prep Niagro", image: "https://cdn.pixabay.com/photo/2017/07/01/12/32/tent-2461376_960_720.jpg" },
  { name: "Prep Niagro", image: "https://cdn.pixabay.com/photo/2017/07/01/12/32/tent-2461376_960_720.jpg" },
  { name: "Niagro Creek", image: "https://cdn.pixabay.com/photo/2016/06/06/08/32/tent-1439061_960_720.jpg" },
  { name: "Niagro Creek", image: "https://cdn.pixabay.com/photo/2016/06/06/08/32/tent-1439061_960_720.jpg" },
  { name: "Niagro Creek", image: "https://cdn.pixabay.com/photo/2016/06/06/08/32/tent-1439061_960_720.jpg" }
];


app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/campgrounds", function(req, res) {
  res.render("campgrounds", {
    campgrounds: campgrounds
  });
});

app.get("/campgrounds/new", function(req, res) {
  res.render("new");
});

app.post("/campgrounds", function(req, res) {
  // get data from form and add to campgrounds array
  // redirect back to campgrounds page
  let name = req.body.name;
  let image = req.body.image;
  let newCampground = { name: name, image: image };
  campgrounds.push(newCampground); // could use db
  res.redirect("/campgrounds");
});

app.listen(process.env.PORT, process.env.IP, function() {
  console.log("Server started");
});
