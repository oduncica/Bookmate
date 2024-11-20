import express from 'express';
import {
  addToReadBooks,
  addReadBooks,
  addDislikedBook,
  getToReadBooks,
  getReadBooks,
  getDislikedBooks,
  removeFromToReadBooks,
  removeFromReadBooks,
  removeDislikedBook
} from '../controllers/libraryControllers.js';
import { protectedRoute } from '../middleware/auth.js';

const router = express.Router();

// Ajouter un livre à la catégorie "à lire"
router.post('/to-read', protectedRoute, addToReadBooks);

// Ajouter un livre à la catégorie "lu"
router.post('/read', protectedRoute, addReadBooks);

// Ajouter un livre à la catégorie "Pas intéressé"
router.post('/dislike', protectedRoute, addDislikedBook);

// Obtenir les livres de la catégorie "à lire"
router.get('/to-read', protectedRoute, getToReadBooks);

// Obtenir les livres de la catégorie "lu"
router.get('/read', protectedRoute, getReadBooks);

// Obtenir les livres de la catégorie "Pas intéressé"
router.get('/dislike', protectedRoute, getDislikedBooks);

// Supprimer un livre de la catégorie "à lire"
router.delete('/to-read/:bookId', protectedRoute, removeFromToReadBooks);

// Supprimer un livre de la catégorie "lu"
router.delete('/read/:bookId', protectedRoute, removeFromReadBooks);

// Supprimer un livre de la catégorie "Pas intéressé"
router.delete('/dislike/:bookId', protectedRoute, removeDislikedBook);

export default router;