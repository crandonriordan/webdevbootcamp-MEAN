let mongoose = require("mongoose");
let Campground = require("./models/campground");
let Comment = require("./models/comment");

var data = [{
    name: "Cloud's Rest",
    image: "https://i.imgur.com/pqq4Bac.jpg",
    description: "blablablalblalblab"
  },
  {
    name: "Turnip Ground",
    image: "https://i.imgur.com/QMp33uP.jpg",
    description: "blablablalblalblab"
  },
  {
    name: "Wyoming Trail",
    image: "https://i.imgur.com/rgTGVZh.jpg",
    description: "blablablalblalblab"
  }
]

function seedDB() {
  //remove all campgrounds
  Campground.remove({}, function(err) {
    if (err) {
      console.log(err);
    }
    console.log("removed campgrounds!");
    //add campgrounds
    data.forEach(function(seed) {
      Campground.create(seed, function(err, campground) {
        if (err) {
          console.log(err);
        }
        else {
          console.log("Added campground");
          //create a comment on campground
          Comment.create({
              text: "Place is great, just no internet",
              author: "Homer"
            },
            function(err, comment) {
              if (err) {
                console.log(err);
              }
              else {
                campground.comments.push(comment);
                campground.save();
                console.log("Added comment");
              }
            });
        }
      });
    });
  });



  //add comments
}

module.exports = seedDB;
