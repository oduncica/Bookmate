import express from 'express';
import { getBooks, swipeRight, swipeLeft } from '../controllers/bookController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/suggestions', protect, getBooks);
router.post('/swipe-right/:bookId', protect, swipeRight);
router.post('/swipe-left/:bookId', protect, swipeLeft);

export default router;