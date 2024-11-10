// models/User.js

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name:{
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age : {
    type: Number,
  },
  gender : {
    type: String,
    enum : ["Homme", "Femme"]
  },
  genderPreference : {
    type: String,
    enum : ["Homme", "Femme", "Tous"]
  },
  bio : {
    type: String,
    default : ""
  },
  images : {
    type: String,
    default : ""
  },
  likes : 
    [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],
    dislikes : 
    [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],
  preferences: {
    genres: [String], // Les genres préférés de l'utilisateur
    authors: [String], // Les auteurs favoris
  },
  matches: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

userSchema.pre("save", async function (next)
 {

  this.password = await bcrypt.hash(this.password, 10);
  next();

}
)
// Méthode pour comparer le mot de passe

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}




const User = mongoose.model("User", userSchema);

export default User;


