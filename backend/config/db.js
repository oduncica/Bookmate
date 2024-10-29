const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connexion à MongoDB réussie !');
    } catch (error) {
        console.error('Connexion à MongoDB échouée !', error.message);
    }
};


module.exports = connectDB;






