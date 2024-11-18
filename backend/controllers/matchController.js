// import axios from 'axios';
// import User from '../models/User.js';
// import Book from '../models/Book.js';

// export const getBookSuggestions = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);

//     const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:${user.bookPreference}&key=${process.env.GOOGLE_BOOKS_API_KEY}`);

//     res.status(200).json({
//       success: true,
//       books: response.data.items,
//     });
//   } catch (error) {
//     console.log("Error in getBookSuggestions: ", error);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

// export const swipeRight = async (req, res) => {
//   try {
//     const { bookId } = req.params;
//     const user = await User.findById(req.user._id);

//     const book = await Book.findOne({ googleBookId: bookId });
//     if (!book) {
//       return res.status(404).json({
//         success: false,
//         message: "Book not found",
//       });
//     }

//     if (!user.likedBooks.includes(book._id)) {
//       user.likedBooks.push(book._id);
//       await user.save();
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Book liked',
//     });
//   } catch (error) {
//     console.log("Error in swipeRight: ", error);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

// export const swipeLeft = async (req, res) => {
//   try {
//     const { bookId } = req.params;
//     const user = await User.findById(req.user._id);

//     const book = await Book.findOne({ googleBookId: bookId });
//     if (!book) {
//       return res.status(404).json({
//         success: false,
//         message: "Book not found",
//       });
//     }

//     if (!user.dislikedBooks.includes(book._id)) {
//       user.dislikedBooks.push(book.__id);
//       await user.save();
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Book disliked',
//     });
//   } catch (error) {
//     console.log("Error in swipeLeft: ", error);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

// export const getMatches = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).populate("likedBooks");

//     res.status(200).json({
//       success: true,
//       matches: user.likedBooks,
//     });
//   } catch (error) {
//     console.log("Error in getMatches: ", error);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

