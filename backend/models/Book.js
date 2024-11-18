import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  googleBookId: { type: String, required: true },
  title: { type: String, required: true },
  authors: [String],
  description: String,
  image: String,
  publishedDate: String,
  categories: [String],
});

const Book = mongoose.model('Book', bookSchema);

export default Book;