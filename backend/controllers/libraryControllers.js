import User from '../models/User.js';
import Book from '../models/Book.js';

export const addToReadBooks = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const book = req.body;

    const existingBook = await Book.findOne({ googleBookId: book.googleBookId });
    let bookId;
    if (!existingBook) {
      const newBook = await Book.create({
        googleBookId: book.googleBookId,
        title: book.title,
        authors: book.authors,
        description: book.description,
        image: book.image,
        publishedDate: book.publishedDate,
        categories: book.categories,
        userId: user._id, // Ajout du champ userId
      });
      bookId = newBook._id;
    } else {
      bookId = existingBook._id;
    }

    if (!user.toReadBooks.includes(bookId)) {
      user.toReadBooks.push(bookId);
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
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const book = req.body;

    const existingBook = await Book.findOne({ googleBookId: book.googleBookId });
    let bookId;
    if (!existingBook) {
      const newBook = await Book.create({
        googleBookId: book.googleBookId,
        title: book.title,
        authors: book.authors,
        description: book.description,
        image: book.image,
        publishedDate: book.publishedDate,
        categories: book.categories,
        userId: user._id, // Ajout du champ userId
      });
      bookId = newBook._id;
    } else {
      bookId = existingBook._id;
    }

    if (!user.readBooks.includes(bookId)) {
      user.readBooks.push(bookId);
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

export const addDislikedBook = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const book = req.body;

    const existingBook = await Book.findOne({ googleBookId: book.googleBookId });
    let bookId;
    if (!existingBook) {
      const newBook = await Book.create({
        googleBookId: book.googleBookId,
        title: book.title,
        authors: book.authors,
        description: book.description,
        image: book.image,
        publishedDate: book.publishedDate,
        categories: book.categories,
        userId: user._id, // Ajout du champ userId
      });
      bookId = newBook._id;
    } else {
      bookId = existingBook._id;
    }

    if (!user.dislikedBooks.includes(bookId)) {
      user.dislikedBooks.push(bookId);
    }

    await user.save();

    res.status(200).json({
      success: true,
      dislikedBooks: user.dislikedBooks,
    });
  } catch (error) {
    console.log("Error in addDislikedBook: ", error);
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

// Ajouter un livre à la catégorie "Pas intéressé"

// Lire les livres de la catégorie "Pas intéressé"
export const getDislikedBooks = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('dislikedBooks');
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.status(200).json({
      success: true,
      dislikedBooks: user.dislikedBooks,
    });
  } catch (error) {
    console.log("Error in getDislikedBooks: ", error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      error,
    });
  }
};

// Supprimer un livre de la catégorie "Pas intéressé"
export const removeDislikedBook = async (req, res) => {
  const { bookId } = req.params;

  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    user.dislikedBooks = user.dislikedBooks.filter(
      (id) => id.toString() !== bookId
    );
    await user.save();

    res.status(200).json({ message: 'Livre supprimé de la catégorie "Pas intéressé"' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};