const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

app.use(express.json());

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
