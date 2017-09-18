let mongoose = require("mongoose");

//User email, name
let userSchema = new mongoose.Schema({
  email: String,
  name: String,
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  }]
});

let User = mongoose.model("User", userSchema);

module.exports = User;
