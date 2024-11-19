import express from 'express';
import { addToReadBooks, addReadBooks, getToReadBooks, getReadBooks, updateBook, removeFromToReadBooks, removeFromReadBooks } from '../controllers/libraryControllers.js';
import { protectedRoute } from '../middleware/auth.js';

const router = express.Router();

// Ajouter un livre à la catégorie "à lire"
router.post('/to-read', protectedRoute, addToReadBooks);

// Ajouter un livre à la catégorie "lu"
router.post('/read', protectedRoute, addReadBooks);

// Obtenir les livres de la catégorie "à lire"
router.get('/to-read', protectedRoute, getToReadBooks);

// Obtenir les livres de la catégorie "lu"
router.get('/read', protectedRoute, getReadBooks);

// Mettre à jour les informations d'un livre
router.put('/book/:bookId', protectedRoute, updateBook);

// Supprimer un livre de la catégorie "à lire"
router.delete('/to-read/:bookId', protectedRoute, removeFromToReadBooks);

// Supprimer un livre de la catégorie "lu"
router.delete('/read/:bookId', protectedRoute, removeFromReadBooks);

export default router;