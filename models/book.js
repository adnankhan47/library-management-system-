const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  publishedDate: Date,
  availableCopies: Number,
  totalCopies: Number,
});

module.exports = mongoose.model('Book', bookSchema);
