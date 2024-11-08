import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li><Link to="/" className="text-white">Accueil</Link></li>
        <li><Link to="/profile" className="text-white">Profil</Link></li>
        <li><Link to="/login" className="text-white">Connexion</Link></li>
        <li><Link to="/signup" className="text-white">Inscription</Link></li>
        <li><Link to="/library" className="text-white">Ma Bibliothèque</Link></li>
        <li><Link to="/suggestions" className="text-white">Suggestions</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;