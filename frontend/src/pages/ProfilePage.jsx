import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { toast } from "react-hot-toast";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faBook,
  faGavel,
  faLock,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FaFire } from "react-icons/fa"; // Import de FaFire

const ProfilePage = () => {
  const { authUser, logout, updateProfile } = useAuthStore();
  const [email, setEmail] = useState("");
  const [bookPreferences, setBookPreferences] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [showPreferencesField, setShowPreferencesField] = useState(false);
  const [showUpdateButton, setShowUpdateButton] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authUser) {
      setEmail(authUser.email);
      setBookPreferences(authUser.bookPreferences.join(", "));
    }
  }, [authUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bookPreferences) {
      setError("Le champ des préférences de lecture est obligatoire");
      return;
    }
    if (showPasswordFields && newPassword && !oldPassword) {
      setError(
        "Veuillez saisir l'ancien mot de passe pour changer le mot de passe"
      );
      return;
    }
    setLoading(true);
    try {
      await updateProfile({
        bookPreferences: bookPreferences.split(", "),
        oldPassword,
        newPassword,
      });
      toast.success("Profil mis à jour avec succès");
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du profil");
    } finally {
      setLoading(false);
    }
  };

  const handlePreferencesClick = () => {
    const newShowPreferencesField = !showPreferencesField;
    setShowPreferencesField(newShowPreferencesField);
    setShowUpdateButton(newShowPreferencesField || showPasswordFields);
  };

  const handlePasswordClick = () => {
    const newShowPasswordFields = !showPasswordFields;
    setShowPasswordFields(newShowPasswordFields);
    setShowUpdateButton(newShowPasswordFields || showPreferencesField);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center p-6"
      style={{
        backgroundImage: "url('/bg_image.png')",
        backgroundSize: "200%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#3A3A64", // Violet background
      }}
    >
      {/* Logo centré en haut */}
      <div className="w-full flex justify-center mb-4">
        <img
          src="/logoHorizontal.png"
          alt="Logo"
          style={{ width: "auto", height: "auto" }} // Conserve les dimensions originales
        />
      </div>

      {/* Email centré en haut */}
      <div className="w-full text-center mb-8">
        <p className="text-2xl font-bold text-white font-platypi">{email}</p>
      </div>

      {/* Section Mes recommandations */}
      <div className="w-full max-w-md mb-6">
        <div className="flex items-center mb-2">
          {/* Remplacement de faBook par FaFire avec une taille cohérente */}
          <FaFire className="text-white mr-2 text-lg" />
          <p className="text-xl font-bold text-white font-platypi">
            Mes recommandations
          </p>
        </div>
        <hr className="border-t-2 border-gray-300 mb-4" />

        {/* Mes genres de livres préférés */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg text-white font-nunito">
            Mes genres de livres préférés
          </p>
          <button onClick={handlePreferencesClick} className="text-white">
            <FontAwesomeIcon icon={faChevronRight} size="lg" />
          </button>
        </div>

        {showPreferencesField && (
          <div className="mb-4">
            <label
              htmlFor="bookPreferences"
              className="block text-sm font-medium text-gray-700"
            >
              Préférences de lecture (séparées par des virgules)
            </label>
            <div className="mt-1">
              <input
                id="bookPreferences"
                name="bookPreferences"
                type="text"
                required
                value={bookPreferences}
                onChange={(e) => setBookPreferences(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              />
            </div>
          </div>
        )}

        {/* Mes livres ignorés */}
        <div className="flex justify-between items-center">
          <p className="text-lg text-white font-nunito">Mes livres ignorés</p>
          <Link to="/ignored-books" className="text-white">
            <FontAwesomeIcon icon={faChevronRight} size="lg" />
          </Link>
        </div>
      </div>

      {/* Section Légal */}
      <div className="w-full max-w-md mb-6">
        <div className="flex items-center mb-2">
          <FontAwesomeIcon
            icon={faGavel}
            size="lg"
            className="text-white mr-2"
          />
          <p className="text-xl font-bold text-white font-platypi">Légal</p>
        </div>
        <hr className="border-t-2 border-gray-300 mb-4" />

        {/* Conditions générales d'utilisation */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg text-white font-nunito">
            Conditions générales d'utilisation
          </p>
          <Link to="/terms" className="text-white">
            <FontAwesomeIcon icon={faChevronRight} size="lg" />
          </Link>
        </div>

        {/* Politique de confidentialité */}
        <div className="flex justify-between items-center">
          <p className="text-lg text-white font-nunito">
            Politique de confidentialité
          </p>
          <Link to="/privacy" className="text-white">
            <FontAwesomeIcon icon={faChevronRight} size="lg" />
          </Link>
        </div>
      </div>

      {/* Section Compte */}
      <div className="w-full max-w-md mb-6">
        <div className="flex items-center mb-2">
          <FontAwesomeIcon
            icon={faLock}
            size="lg"
            className="text-white mr-2"
          />
          <p className="text-xl font-bold text-white font-platypi">Compte</p>
        </div>
        <hr className="border-t-2 border-gray-300 mb-4" />

        {/* Changer de mot de passe */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg text-white font-nunito">
            Changer de mot de passe
          </p>
          <button onClick={handlePasswordClick} className="text-white">
            <FontAwesomeIcon icon={faChevronRight} size="lg" />
          </button>
        </div>

        {showPasswordFields && (
          <>
            <div>
              <label
                htmlFor="oldPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Ancien mot de passe
              </label>
              <div className="mt-1">
                <input
                  id="oldPassword"
                  name="oldPassword"
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Nouveau mot de passe
              </label>
              <div className="mt-1">
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                />
              </div>
            </div>
          </>
        )}

        {/* Supprimer mon compte */}
        <div className="flex justify-between items-center">
          <p className="text-lg text-white font-nunito">Supprimer mon compte</p>
          <Link to="/delete-account" className="text-white">
            <FontAwesomeIcon icon={faChevronRight} size="lg" />
          </Link>
        </div>
      </div>

      {/* Ligne blanche entre Compte et Me déconnecter */}
      <hr className="border-t-2 border-white w-full max-w-md mb-6" />

      {/* Section Me déconnecter */}
      <div className="w-full max-w-md mb-6">
        <div className="flex items-center">
          <FontAwesomeIcon
            icon={faSignOutAlt}
            size="lg"
            className="text-white mr-2"
          />
          <button
            onClick={logout}
            className="text-white text-lg font-nunito hover:text-gray-300"
          >
            Me déconnecter
          </button>
        </div>
      </div>

      {/* Formulaire de mise à jour du profil */}
      <div className="w-full max-w-md mb-6  rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {showUpdateButton && (
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                disabled={loading}
              >
                {loading ? "Mise à jour..." : "Mettre à jour le profil"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;