let express = require("express"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  app = express(),
  expressSanitizer = require("express-sanitizer"),
  methodOverride = require("method-override");

mongoose.connect("mongodb://localhost/blog");


// APP Config
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

// MONGOOSE/MODEL Config


let blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now }
});

let Blog = mongoose.model("Blog", blogSchema);

// Routes
//index
app.get("/", function(req, res) {
  res.redirect("/blogs");
})

app.get("/blogs", function(req, res) {
  Blog.find({}, function(err, blogs) {
    if (err) {
      console.log(err);
    }
    else {
      res.render("index", { blogs: blogs });
    }
  });
});

//new 
app.get("/blogs/new", function(req, res) {
  res.render("new");
});

// create
app.post("/blogs", function(req, res) {
  //create blog
  console.log("create");
  req.body.blog.body = req.sanitize(req.body.blog.body);
  console.log("==========")
  console.log(req.body);
  Blog.create(req.body.blog, function(err, blog) {
    if (err) {
      console.log(err);
    }
    else {
      res.redirect("/blogs");
    }
  });
  //redirect to index
});

app.get("/blogs/:id", function(req, res) {
  Blog.findById(req.params.id, function(err, foundBlog) {
    if (err) {
      res.redirect("/blogs");
    }
    else {
      res.render("show", { blog: foundBlog })
    }
  });
});

//edit
app.get("/blogs/:id/edit", function(req, res) {
  Blog.findById(req.params.id, function(err, foundBlog) {
    if (err) {
      console.log(err);
      res.redirect("/blogs")
    }
    else {
      res.render("edit", { blog: foundBlog })
    }
  });
});

//update 
app.put("/blogs/:id", function(req, res) {
  req.body.blog.body = req.sanitize(req.body.blog.body);
  let id = req.params.id;
  Blog.findByIdAndUpdate(id, req.body.blog, function(err, updatedBlog) {
    if (err) {
      res.redirect("/blogs");
    }
    else {
      res.redirect("/blogs/" + id);
    }
  })
});

// destroy
app.delete("/blogs/:id", function(req, res) {
  let id = req.params.id;
  Blog.findByIdAndRemove(id, function(err, deletedBlog) {
    if (err) {
      console.log("Error deleting blog");
      console.log(err);
    }
    else {
      res.redirect("/blogs")
      console.log("Deleted blog: ");
      console.log(deletedBlog);
    }
  });
});






app.listen(process.env.PORT, process.env.IP, function() {
  console.log("Server started");
})
