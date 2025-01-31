import express from "express";
import { updateProfile } from "../controllers/profileController.js";
import { protectedRoute } from "../middleware/auth.js";

const router = express.Router();

// Route pour mettre à jour le profil de l'utilisateur
router.put("/update", protectedRoute, updateProfile);

export default router;
