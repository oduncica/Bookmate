import axios from 'axios';
import User from '../models/User.js';
import Book from '../models/Book.js';

const GOOGLE_BOOKS_API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

export const getBookSuggestions = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const genres = user.bookPreferences.join('+'); // Concaténer les genres préférés avec un séparateur
    console.log('Genres:', genres);

    // Requête à l'API Google Books pour obtenir des suggestions de livres basées sur les genres préférés
    const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${genres}&key=${GOOGLE_BOOKS_API_KEY}`;
    console.log(`Request URL: ${url}`);
    const response = await axios.get(url);
    console.log('Google Books API Response:', response.data);

    const books = response.data.items;
    if (!books) {
      return res.status(404).json({
        success: false,
        message: 'No books found',
      });
    }

    res.status(200).json({
      success: true,
      books,
    });
  } catch (error) {
    console.error('Error in getBookSuggestions:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const likeBook = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { bookId } = req.params;

    // Log pour vérifier l'ID du livre et l'URL de la requête
    console.log(`Liking book with ID: ${bookId}`);
    const url = `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${GOOGLE_BOOKS_API_KEY}`;
    console.log(`Request URL: ${url}`);

    // Requête à l'API Google Books pour obtenir les détails du livre
    const response = await axios.get(url);
    console.log('Google Books API Response:', response.data);

    const bookData = response.data;

    // Vérifiez si le livre existe déjà dans la base de données
    let book = await Book.findOne({ googleBookId: bookId });
    if (!book) {
      // Créez un nouveau livre dans la base de données
      book = await Book.create({
        googleBookId: bookId,
        title: bookData.volumeInfo.title,
        authors: bookData.volumeInfo.authors,
        description: bookData.volumeInfo.description,
        image: bookData.volumeInfo.imageLinks?.thumbnail,
        publishedDate: bookData.volumeInfo.publishedDate,
        categories: bookData.volumeInfo.categories,
      });
    }

    // Ajoutez le livre à la liste des livres aimés et à lire de l'utilisateur
    user.likedBooks.push(book._id);
    user.toReadBooks.push(book._id);
    await user.save();

    res.status(200).json({
      success: true,
      likedBooks: user.likedBooks,
      toReadBooks: user.toReadBooks,
    });
  } catch (error) {
    console.error('Error in likeBook:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const dislikeBook = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { bookId } = req.params;

    // Log pour vérifier l'ID du livre et l'URL de la requête
    console.log(`Disliking book with ID: ${bookId}`);
    const url = `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${GOOGLE_BOOKS_API_KEY}`;
    console.log(`Request URL: ${url}`);

    // Requête à l'API Google Books pour obtenir les détails du livre
    const response = await axios.get(url);
    console.log('Google Books API Response:', response.data);

    const bookData = response.data;

    // Vérifiez si le livre existe déjà dans la base de données
    let book = await Book.findOne({ googleBookId: bookId });
    if (!book) {
      // Créez un nouveau livre dans la base de données
      book = await Book.create({
        googleBookId: bookId,
        title: bookData.volumeInfo.title,
        authors: bookData.volumeInfo.authors,
        description: bookData.volumeInfo.description,
        image: bookData.volumeInfo.imageLinks?.thumbnail,
        publishedDate: bookData.volumeInfo.publishedDate,
        categories: bookData.volumeInfo.categories,
      });
    }

    // Ajoutez le livre à la liste des livres non aimés de l'utilisateur
    user.dislikedBooks.push(book._id);
    await user.save();

    res.status(200).json({
      success: true,
      dislikedBooks: user.dislikedBooks,
    });
  } catch (error) {
    console.error('Error in dislikeBook:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const getMatches = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('likedBooks');
    res.status(200).json({
      success: true,
      matches: user.likedBooks,
    });
  } catch (error) {
    console.error('Error in getMatches:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};