const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/adminController");

router.post("/add-book", AdminController.addBook); // Add a book

module.exports = router;
