let mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/blog_demo");

//Post title, content
let postSchema = new mongoose.Schema({
  title: String,
  content: String
});
let Post = mongoose.model("Post", postSchema);

//User email, name
let userSchema = new mongoose.Schema({
  email: String,
  name: String,
  posts: [postSchema]
});
let User = mongoose.model("User", userSchema);

// let newUser = new User({
//   email: "hermione@wgu.edu",
//   name: "Hermione"
// });

// newUser.posts.push({
//   title: "Brew Potions",
//   content: "recipe recipe recipe"
// });

// newUser.save(function(err, user) {
//   if (err) {
//     console.log(err);
//   }
//   else {
//     console.log(user);
//   }
// });

User.findOne({ name: "Hermione" }, function(err, user) {
  if (err) {
    console.log(err);
  }
  else {
    console.log(user);
    user.posts.push({
      title: "Three Things I Like",
      content: "Vuldy, vuldy, vuldy"
    });
    user.save(function(err, user) {
      if (err) {
        console.log(err);
      }
      else {
        console.log(user);
      }
    })
  }
});
