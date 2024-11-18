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

export const addReadBooks = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const book = req.body;

    const existingBook = await Book.findOne({ googleBookId: book.googleBookId });
    if (!existingBook) {
      const newBook = await Book.create(book);
      user.readBooks.push(newBook._id);
    } else {
      user.readBooks.push(existingBook._id);
    }

    await user.save();

    res.status(200).json({
      success: true,
      readBooks: user.readBooks,
    });
  } catch (error) {
    console.log("Error in addReadBooks: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getToReadBooks = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('toReadBooks');
    res.status(200).json({
      success: true,
      toReadBooks: user.toReadBooks,
    });
  } catch (error) {
    console.log("Error in getToReadBooks: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getReadBooks = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('readBooks');
    res.status(200).json({
      success: true,
      readBooks: user.readBooks,
    });
  } catch (error) {
    console.log("Error in getReadBooks: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const bookData = req.body;

    // Rechercher le livre par googleBookId au lieu de _id
    const book = await Book.findOneAndUpdate({ googleBookId: bookId }, bookData, { new: true });

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      book,
    });
  } catch (error) {
    console.log("Error in updateBook: ", error);
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