const mongoose = require("mongoose");

const borrowSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  borrowDate: { type: Date, required: true },
  returnDate: { type: Date, required: true },
});

const Borrow = mongoose.model("Borrow", borrowSchema);

module.exports = Borrow;
