// app.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');



dotenv.config();
connectDB();

const app = express();


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Middleware JSON
app.use(express.json());

// Routes de l'application
app.get('/', (req, res) => res.send('<h1>Bienvenue sur Bookmate</h1>'));
app.get('/hello', (req, res) => res.send('<h1>Rencontrez votre ame soeur</h1>'));

app.use('/api/auth', authRoutes);

// Exportation pour utilisation par server.js
module.exports = app;
