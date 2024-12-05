import User from "../models/User.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import sendEmail from "../config/sendEmail.js"; // Importez la fonction sendEmail


export const updateProfile = async (req, res) => {
  try {
    const updatedData = req.body;

    const updatedUser = await User.findByIdAndUpdate(req.user._id, updatedData, { new: true });

    res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.log("Error in updateProfile: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Générer un token de réinitialisation
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Enregistrer le token et sa date d'expiration
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save();

    // Envoyer l'email de réinitialisation
    const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;
    const message = `Vous avez demandé une réinitialisation de mot de passe. Veuillez cliquer sur le lien suivant pour réinitialiser votre mot de passe : \n\n ${resetUrl}`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Réinitialisation de mot de passe',
        message,
      });

      res.status(200).json({
        success: true,
        message: 'Email de réinitialisation envoyé',
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return res.status(500).json({
        success: false,
        message: 'Email could not be sent',
      });
    }
  } catch (error) {
    console.log("Error in requestPasswordReset: ", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};


export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Hash le token reçu
    const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');
    console.log('Received token:', token);
    console.log('Hashed token:', resetPasswordToken);

    // Trouver l'utilisateur avec le token et vérifier si le token n'a pas expiré
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      console.log('Token not found or expired');
      return res.status(400).json({
        success: false,
        message: "Invalid token or token has expired",
      });
    }

    // Mettre à jour le mot de passe
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    console.log('Password hashed');

    // Supprimer le token de réinitialisation
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    console.log('User saved with new password');

    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    console.log("Error in resetPassword:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};