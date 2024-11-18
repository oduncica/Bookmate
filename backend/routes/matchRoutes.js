import express from 'express';
import { getBookSuggestions, likeBook, dislikeBook, getMatches } from '../controllers/matchController.js';
import { protectedRoute } from '../middleware/auth.js';

const router = express.Router();

router.get('/suggestions', protectedRoute, getBookSuggestions);
router.post('/like/:bookId', protectedRoute, likeBook);
router.post('/dislike/:bookId', protectedRoute, dislikeBook);
router.get('/matches', protectedRoute, getMatches);

export default router;

