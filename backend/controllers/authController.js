// authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assurez-vous que le chemin est correct

// authController.js - Fonction signup
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => {
          console.error('Erreur lors de la sauvegarde de l\'utilisateur:', error);
          res.status(400).json({ error });
        });
    })
    .catch(error => {
      console.error('Erreur lors du hachage du mot de passe:', error);
      res.status(500).json({ error });
    });
};


// Connexion
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        console.log('Utilisateur non trouvé');
        return res.status(401).json({ message: 'Utilisateur non trouvé ou mot de passe incorrect' });
      }
      // Comparaison des mots de passe
      bcrypt.compare(req.body.password, user.password)
        .then(isPasswordValid => {
          if (!isPasswordValid) {
            console.log('Mot de passe incorrect');
            return res.status(401).json({ message: 'Utilisateur non trouvé ou mot de passe incorrect' });
          }
          // Génération du token JWT
          const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
          );
          return res.status(200).json({ userId: user._id, token });
        })
        .catch(error => {
          console.error('Erreur lors de la vérification du mot de passe:', error);
          res.status(500).json({ error: 'Erreur interne, veuillez réessayer plus tard' });
        });
    })
    .catch(error => {
      console.error('Erreur lors de la recherche de l\'utilisateur:', error);
      res.status(500).json({ error: 'Erreur interne, veuillez réessayer plus tard' });
    });
};

// Obtenir la liste des utilisateurs
exports.getUsers = (req, res, next) => {
  User.find()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' }));
};
