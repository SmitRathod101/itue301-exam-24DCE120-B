const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const Book = require("./models/Book");
const Member = require("./models/Member");
const Borrowing = require("./models/Borrowing");

const requestLogger = require("./middleware/requestLogger");
const errorHandler = require("./middleware/errorHandler");

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// In-memory data
let books = [
  {
    id: 1,
    title: "Book 1",
    author: "Smit Rathod",
    category: "Fiction",
    isbn: "9780062315007",
    available: true
  },
  {
    id: 2,
    title: "Book 2",
    author: "Smit Rathod",
    category: "Programming",
    isbn: "9780132350884",
    available: false
  }
];

let borrowings = [];

// GET all books
app.get("/api/v1/books", (req, res) => {
  res.status(200).json({
    success: true,
    data: books
  });
});

// GET all borrowing records
app.get("/api/v1/borrowings", (req, res) => {
  res.status(200).json({
    success: true,
    data: borrowings
  });
});

// POST a new borrowing record
app.post("/api/v1/borrowings", (req, res) => {
  const borrowing = {
    id: borrowings.length + 1,
    memberId: req.body.memberId,
    bookId: req.body.bookId,
    borrowDate: req.body.borrowDate,
    returnDate: req.body.returnDate,
    status: req.body.status || "borrowed"
  };

  borrowings.push(borrowing);

  res.status(201).json({
    success: true,
    data: borrowing
  });
});
//app.get("/api/v1/test-error", (req, res, next) => {
 // next(new Error("Test error"));
//});
// Create a book in MongoDB using Mongoose
app.post("/api/v1/mongo/books", async (req, res) => {
  try {
    const book = await Book.create(req.body);

    res.status(201).json({
      success: true,
      message: "Book created successfully in MongoDB",
      data: book
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Book validation failed",
        errors: Object.values(error.errors).map((err) => err.message)
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "ISBN must be unique"
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create book"
    });
  }
});
// Global error handler - must be last
app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });
