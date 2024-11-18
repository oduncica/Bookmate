import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  googleBookId: { type: String, required: true, unique: true }, // ID unique du livre Google
  title: { type: String, required: true }, // Titre du livre
  authors: [String], // Liste des auteurs
  description: String, // Description du livre
  image: String, // URL de l'image de couverture
  publishedDate: String, // Date de publication
  categories: [String], // Catégories du livre
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Référence à l'utilisateur
  addedAt: { type: Date, default: Date.now } // Date d'ajout du livre
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
