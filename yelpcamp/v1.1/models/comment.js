let mongoose = require("mongoose");
let commentSchema = mongoose.Schema({
    text: String,
    author: String
});

let Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
