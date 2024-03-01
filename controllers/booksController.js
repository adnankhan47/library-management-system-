const Book = require('../models/book');
const User = require('../models/user');

const mongoose = require('mongoose');

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    // res.send("allbooks")
    console.log("all books console");
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const bookId = req.params.bookId;

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({ message: 'Invalid book ID format' });
    }

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.addBook = async (req, res) => {
  try {

    console.log("role=>"+req.user.role);
    if (req.user.role !== 'admin') {
     
      return res.status(403).json({ message: 'Only admin users are allowed to add books' });
    }

    const { title, author, genre, publishedDate, availableCopies, totalCopies } = req.body;

    if (!title || !author || !genre || !publishedDate || !availableCopies || !totalCopies) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new book
    const newBook = await Book.create({
      title,
      author,
      genre,
      publishedDate,
      availableCopies,
      totalCopies,
    });

    res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.updateBook = async (req, res) => {
  try {

    if (req.user.role !== 'admin') {
     
      return res.status(403).json({ message: 'Only admin users are allowed to add books' });
    }

    const bookId = req.params.bookId;

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({ message: 'Invalid book ID format' });
    }

    const updatedBookDetails = req.body;

    const updatedBook = await Book.findByIdAndUpdate(bookId, updatedBookDetails, { new: true });

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.partialUpdateBook = async (req, res) => {
  try {
    
    if (req.user.role !== 'admin') {
     
      return res.status(403).json({ message: 'Only admin users are allowed to add books' });
    }

    const bookId = req.params.bookId;

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({ message: 'Invalid book ID format' });
    }

    const partialUpdate = req.body;

    const updatedBook = await Book.findOneAndUpdate({ _id: bookId }, partialUpdate, { new: true });

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


