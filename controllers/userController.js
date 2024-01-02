const Book = require("../models/Book");
const User = require("../models/User");
const Borrow = require("../models/Borrow");
const nodemailer = require("nodemailer");
const { sendReminderEmail } = require("../service/emailService");

module.exports = {
  getAllBooks: async (req, res) => {
    try {
      const books = await Book.find({ available: true });
      res.json(books);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  borrowBook: async (req, res) => {
    const { bookId } = req.params;
    const { userId } = req.body;

    try {
      const book = await Book.findById(bookId);
      const user = await User.findById(userId);

      if (!book || !user) {
        return res.status(404).json({ message: "Book or user not found" });
      }

      if (!book.available) {
        return res.status(400).json({ message: "Book is not available" });
      }

      const borrowedBook = new Borrow({
        book: book._id,
        user: user._id,
        borrowDate: new Date(),
        returnDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      });

      await borrowedBook.save();

      book.available = false;
      await book.save();

      await sendReminderEmail(user.email, book.title, borrowedBook.returnDate);

      res.json({ message: "Book borrowed successfully", borrowedBook });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
