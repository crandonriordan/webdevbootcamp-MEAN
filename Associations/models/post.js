let mongoose = require("mongoose");
//Post title, content
let postSchema = new mongoose.Schema({
  title: String,
  content: String
});


module.exports = mongoose.model("Post", postSchema);
