import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faBook, faGavel, faLock, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const ProfilePage = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center p-6"
      style={{
        backgroundImage: "url('/bg_image.png')",
        backgroundSize: '200%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#543787', // Violet background
      }}
    >
      {/* Email centré en haut */}
      <div className="w-full text-center mb-8">
        <p className="text-2xl font-bold text-white font-platypi">user@example.com</p>
      </div>

      {/* Section Mes recommandations */}
      <div className="w-full max-w-md mb-6">
        <div className="flex items-center mb-2">
          <FontAwesomeIcon icon={faBook} size="lg" className="text-white mr-2" />
          <p className="text-xl font-bold text-white font-platypi">Mes recommandations</p>
        </div>
        <hr className="border-t-2 border-gray-300 mb-4" />

      {/* Mes genres de livres préférés */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg text-white font-nunito">Mes genres de livres préférés</p>
        <Link to="/genres" className="text-white">
          <FontAwesomeIcon icon={faChevronRight} size="lg" />
        </Link>
      </div>

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
        <FontAwesomeIcon icon={faGavel} size="lg" className="text-white mr-2" />
        <p className="text-xl font-bold text-white font-platypi">Légal</p>
      </div>
      <hr className="border-t-2 border-gray-300 mb-4" />

      {/* Conditions générales d'utilisation */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg text-white font-nunito">Conditions générales d'utilisation</p>
        <Link to="/terms" className="text-white">
          <FontAwesomeIcon icon={faChevronRight} size="lg" />
        </Link>
      </div>

      {/* Politique de confidentialité */}
      <div className="flex justify-between items-center">
        <p className="text-lg text-white font-nunito">Politique de confidentialité</p>
        <Link to="/privacy" className="text-white">
          <FontAwesomeIcon icon={faChevronRight} size="lg" />
        </Link>
      </div>
    </div>

      {/* Section Compte */}
      <div className="w-full max-w-md mb-6">
        <div className="flex items-center mb-2">
          <FontAwesomeIcon icon={faLock} size="lg" className="text-white mr-2" />
          <p className="text-xl font-bold text-white font-platypi">Compte</p>
        </div>
        <hr className="border-t-2 border-gray-300 mb-4" />

        {/* Changer de mot de passe */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg text-white font-nunito">Changer de mot de passe</p>
          <Link to="/change-password" className="text-white">
            <FontAwesomeIcon icon={faChevronRight} size="lg" />
          </Link>
        </div>

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
          <FontAwesomeIcon icon={faSignOutAlt} size="lg" className="text-white mr-2" />
          <Link to="/logout" className="text-white text-lg font-nunito hover:text-gray-300">
            Me déconnecter
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
