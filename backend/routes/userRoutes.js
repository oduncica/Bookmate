import express from 'express';
import { protectedRoute } from '../middleware/auth.js';
import { updateProfile, requestPasswordReset, resetPassword } from '../controllers/userController.js';

const router = express.Router();

router.put("/update", protectedRoute, updateProfile);
router.post('/passwordreset', requestPasswordReset);
router.put('/passwordreset/:token', resetPassword);

export default router;