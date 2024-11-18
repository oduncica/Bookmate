import axios from 'axios';
import User from '../models/User.js';

export const getBooks = async (req, res) => {
  const user = await User.findById(req.user._id);

  const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:${user.genrePreference}&key=${process.env.GOOGLE_BOOKS_API_KEY}`);

  res.json(response.data.items);
};

export const swipeRight = async (req, res) => {
  const user = await User.findById(req.user._id);
  const { bookId } = req.params;

  if (!user.likedBooks.includes(bookId)) {
    user.likedBooks.push(bookId);
    await user.save();
  }

  res.json({ message: 'Book liked' });
};

export const swipeLeft = async (req, res) => {
  const user = await User.findById(req.user._id);
  const { bookId } = req.params;

  if (!user.dislikedBooks.includes(bookId)) {
    user.dislikedBooks.push(bookId);
    await user.save();
  }

  res.json({ message: 'Book disliked' });
};