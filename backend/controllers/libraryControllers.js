import User from '../models/User.js';
import Book from '../models/Book.js';

export const addToReadBooks = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const book = req.body;

    const existingBook = await Book.findOne({ googleBookId: book.googleBookId });
    if (!existingBook) {
      const newBook = await Book.create(book);
      user.toReadBooks.push(newBook._id);
    } else {
      user.toReadBooks.push(existingBook._id);
    }

    await user.save();

    res.status(200).json({
      success: true,
      toReadBooks: user.toReadBooks,
    });
  } catch (error) {
    console.log("Error in addToReadBooks: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const moveToReadBooks = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { bookId } = req.params;

    user.toReadBooks = user.toReadBooks.filter(b => b.toString() !== bookId);
    if (!user.readBooks.includes(bookId)) {
      user.readBooks.push(bookId);
    }

    await user.save();

    res.status(200).json({
      success: true,
      readBooks: user.readBooks,
    });
  } catch (error) {
    console.log("Error in moveToReadBooks: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const removeFromToReadBooks = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { bookId } = req.params;

    user.toReadBooks = user.toReadBooks.filter(b => b.toString() !== bookId);
    await user.save();

    res.status(200).json({
      success: true,
      toReadBooks: user.toReadBooks,
    });
  } catch (error) {
    console.log("Error in removeFromToReadBooks: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const removeFromReadBooks = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { bookId } = req.params;

    user.readBooks = user.readBooks.filter(b => b.toString() !== bookId);
    await user.save();

    res.status(200).json({
      success: true,
      readBooks: user.readBooks,
    });
  } catch (error) {
    console.log("Error in removeFromReadBooks: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};