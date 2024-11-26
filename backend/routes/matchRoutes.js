import express from 'express';
import { getBookSuggestions, likeBook, dislikeBook, getMatches } from '../controllers/matchController.js';
import { protectedRoute } from '../middleware/auth.js';

const router = express.Router();

router.get('/suggestions', protectedRoute, getBookSuggestions);
router.post('/like/:bookId', protectedRoute, likeBook); //Ajouter à la categorie à lire de la bibliothèque
router.post('/dislike/:bookId', protectedRoute, dislikeBook); //Ajouter à la categorie pas interessé de la bibliothèque
router.post('/read/:bookId', protectedRoute, dislikeBook); //Ajouter à la categorie lu de la bibliothèque


export default router;

