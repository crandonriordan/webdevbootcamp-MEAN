let express = require("express"),
  bodyParser = require("body-parser"),
  app = express(),
  Campground = require("./models/campground"),
  seedDB = require("./seeds"),
  mongoose = require("mongoose");



mongoose.connect("mongodb://localhost/yelp_camp");
seedDB();

// SCHEMA SETUP


app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("landing");
});
// INDEX ROUTE
app.get("/campgrounds", function(req, res) {
  // get all campgrounds from db
  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log(err);
    }
    else {
      res.render("index", {
        campgrounds: allCampgrounds
      });
    }
  });
  // res.render("campgrounds", {
  //   campgrounds: campgrounds
  // });
});


//NEW ROUTE
app.get("/campgrounds/new", function(req, res) {
  res.render("new");
});

// SHOW ROUTE
app.get("/campgrounds/:id", function(req, res) {
  // find the campground with ID
  let id = req.params.id;
  Campground.findById(id, function(err, foundCampground) {
    if (err) {
      console.log(err);
    }
    else {
      res.render("show", {
        campground: foundCampground
      });
    }
  });
});


//CREATE ROUTE
app.post("/campgrounds", function(req, res) {
  // get data from form and add to campgrounds array
  // redirect back to campgrounds page
  let name = req.body.name;
  let image = req.body.image;
  let description = req.body.description;
  let newCampground = { name: name, image: image, description: description };
  // create new campground and save to db
  Campground.create(newCampground, function(err, newCampground) {
    if (err) {
      console.log(err)
    }
    else {
      res.redirect("/campgrounds");
    }
  });
});

app.listen(process.env.PORT, process.env.IP, function() {
  console.log("Server started");
});
