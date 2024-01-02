const Book = require("../models/Book");

module.exports = {
  addBook: async (req, res) => {
    const { title, author, ISBN } = req.body;

    try {
      const newBook = new Book({
        title,
        author,
        ISBN,
        available: true,
      });

      await newBook.save();

      res.json({ message: "Book added successfully", newBook });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
