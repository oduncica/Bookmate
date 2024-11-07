const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  bookId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  authors: [String],
  description: String,
  pageCount: Number,
  categories: [String]
});

module.exports = mongoose.model('Book', bookSchema);