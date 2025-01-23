import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import libraryRoutes from "./routes/libraryRoutes.js";
import { connectDB } from "./config/db.js";
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connexion à la base de données
connectDB();

// Middleware pour parser le JSON
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173" || "https://bookmate-gh7l.onrender.com/",
    credentials: true,
  })
);
// Utilisation des routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/match", matchRoutes);
app.use("/api/library", libraryRoutes);

app.use(express.static(path.join(__dirname, "dist")));

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
