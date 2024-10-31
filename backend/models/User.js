// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  preferences: {
    genres: [String],  // Les genres préférés de l'utilisateur
    authors: [String]  // Les auteurs favoris
  }
});

// Méthode pour comparer le mot de passe
userSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

// Avant de sauvegarder, hasher le mot de passe si modifié
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', userSchema);
