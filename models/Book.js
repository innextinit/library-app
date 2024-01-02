const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  ISBN: { type: String, required: true, unique: true },
  available: { type: Boolean, default: true },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
