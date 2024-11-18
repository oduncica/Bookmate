import express from 'express';
import { addToReadBooks, moveToReadBooks, removeFromToReadBooks, removeFromReadBooks } from '../controllers/libraryController.js';
import { protectedRoute } from '../middleware/auth.js';

const router = express.Router();

router.post('/to-read', protectedRoute, addToReadBooks);
router.post('/read/:bookId', protectedRoute, moveToReadBooks);
router.delete('/to-read/:bookId', protectedRoute, removeFromToReadBooks);
router.delete('/read/:bookId', protectedRoute, removeFromReadBooks);

export default router;