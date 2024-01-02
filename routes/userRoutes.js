const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

router.get("/books", UserController.getAllBooks); // Get all books
router.post("/borrow/:bookId", UserController.borrowBook); // Borrow a book

module.exports = router;
