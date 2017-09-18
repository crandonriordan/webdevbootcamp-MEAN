let mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/blog_demo2");

let Post = require("./models/post");
let User = require("./models/user");



// User.create({ email: "bob@gmail.com", name: "Bob" });

// Post.create({
//   title: "Fart Bucket Part IIII",
//   content: "ooopppppifdsafiasdfasdfasdfasdfasdf"
// }, function(err, post) {
//   if (err) {
//     console.log(err);
//   }
//   else {
//     User.findOne({ name: "Bob" }, function(err, foundUser) {
//       if (err) {
//         console.log(err);
//       }
//       else {
//         foundUser.posts.push(post);
//         foundUser.save(function(err, data) {
//           if (err) {
//             console.log(err);
//           }
//           else {
//             console.log(data);
//           }
//         })
//       }
//     })
//   }
// });


//Find user
// //Find all posts for that user

// User.findOne({ name: "Bob" }).populate("posts").exec(function(err, user) {
//   if (err) {
//     console.log(err);
//   }
//   else {
//     console.log(user);
//   }
// });
