import jwt from "jsonwebtoken";
import User from "../models/User.js";

const signToken = (id) => { 
   return jwt.sign({ id }, 
    process.env.JWT_SECRET, {
        expiresIn: "7d"}); };

export const signup = async (req, res) => {
  const { name, email, password, age, gender, genderPreference } = req.body;

  try {
    if (!email || !password ) {
      return res.status(400).json({
        success: false,
         message: "All fields are required" });
    }
      if(age < 18){ return res.status(400).json({ success: false, message: "You must be at least 18 years old" }); }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }
    const newUser = await User.create({ name, email, password,age,gender,genderPreference });

    const token = signToken(newUser._id);

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite : "strict",
      secure : process.env.NODE_ENV === "production",
    })

    res.status(201).json({
      success: true,
      token,
      user: newUser,
    })
    
  } catch (error) {
    console.error("Error in signup controller:", error);
    res.status(500).json({
      success: false,
      message: "Internal server errorr"});
  }
}



export const login = async (req, res) => {
  const { email, password } = req.body;
try {
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required" });
  }

  const user = await User.findOne({ email }).select("+password"); 

  if(!user || !(await user.matchPassword(password))) {
    return res.status(404).json({
      success: false,
      message: "Invalid email or password " });
  }

  const token = signToken(user._id);

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite : "strict",
    secure : process.env.NODE_ENV === "production",
  })

  res.status(200).json({
    success: true,
    token,
    user: user,
  })
  
} catch (error) {
  console.error("Error in login  controller:", error);
  res.status(500).json({
    success: false,
    message: "Internal server errorr"});
}

  
}
export const logout = async (req, res) => {

  res.clearCookie("jwt");
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
}







// // authController.js
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User'); // Assurez-vous que le chemin est correct

// // authController.js - Fonction signup
// exports.signup = (req, res, next) => {
//   bcrypt.hash(req.body.password, 10)
//     .then(hash => {
//       const user = new User({
//         email: req.body.email,
//         password: hash
//       });
//       user.save()
//         .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
//         .catch(error => {
//           console.error('Erreur lors de la sauvegarde de l\'utilisateur:', error);
//           res.status(400).json({ error });
//         });
//     })
//     .catch(error => {
//       console.error('Erreur lors du hachage du mot de passe:', error);
//       res.status(500).json({ error });
//     });
// };


// // Connexion
// exports.login = (req, res, next) => {
//   User.findOne({ email: req.body.email })
//     .then(user => {
//       if (!user) {
//         console.log('Utilisateur non trouvé');
//         return res.status(401).json({ message: 'Utilisateur non trouvé ou mot de passe incorrect' });
//       }
//       // Comparaison des mots de passe
//       bcrypt.compare(req.body.password, user.password)
//         .then(isPasswordValid => {
//           if (!isPasswordValid) {
//             console.log('Mot de passe incorrect');
//             return res.status(401).json({ message: 'Utilisateur non trouvé ou mot de passe incorrect' });
//           }
//           // Génération du token JWT
//           const token = jwt.sign(
//             { userId: user._id },
//             process.env.JWT_SECRET,
//             { expiresIn: '24h' }
//           );
//           return res.status(200).json({ userId: user._id, token });
//         })
//         .catch(error => {
//           console.error('Erreur lors de la vérification du mot de passe:', error);
//           res.status(500).json({ error: 'Erreur interne, veuillez réessayer plus tard' });
//         });
//     })
//     .catch(error => {
//       console.error('Erreur lors de la recherche de l\'utilisateur:', error);
//       res.status(500).json({ error: 'Erreur interne, veuillez réessayer plus tard' });
//     });
// };

// // Obtenir la liste des utilisateurs
// exports.getUsers = (req, res, next) => {
//   User.find()
//     .then(users => res.status(200).json(users))
//     .catch(error => res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' }));
// };
