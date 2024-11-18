import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import matchRoutes from './routes/matchRoutes.js';
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connexion à la base de données
connectDB();

// Middleware pour parser le JSON
app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        origin : "http://localhost:5173",
        credentials : true,
    }
)

)
// Utilisation des routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/matches', matchRoutes);

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});