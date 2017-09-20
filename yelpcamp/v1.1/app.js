let express = require("express"),
  bodyParser = require("body-parser"),
  app = express(),
  Campground = require("./models/campground"),
  seedDB = require("./seeds"),
  Comment = require("./models/comment"),
  mongoose = require("mongoose");



mongoose.connect("mongodb://localhost/yelp_camp");
seedDB();

// SCHEMA SETUP


app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static('public'));

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
      res.render("campgrounds/index", {
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
  res.render("campground/new");
});

// SHOW ROUTE
app.get("/campgrounds/:id", function(req, res) {
  // find the campground with ID
  Campground.findOne({ _id: req.params.id }).populate("comments").exec(function(err, foundCampground) {
    if (err) {
      console.log(err);
    }
    else {
      res.render("campgrounds/show", { campground: foundCampground });
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


// ================
// ================
// Comment Routes

app.get("/campgrounds/:id/comments/new", function(req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err)
    }
    else {
      res.render("comments/new", {
        campground: campground
      });
    }
  })

});

app.post("/campgrounds/:id/comments", function(req, res) {
  // look up campground using ID
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    }
    else {
      Comment.create(req.body.comment, function(err, comment) {
        if (err) {
          console.log(err);
        }
        else {
          campground.comments.push(comment);
          campground.save();
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  })
  // create new comment
  //connect comment to campground
  // redirect to show page
});

app.listen(process.env.PORT, process.env.IP, function() {
  console.log("Server started");
});
