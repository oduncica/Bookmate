import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { toast } from 'react-hot-toast';

const ProfilePage = () => {
  const { authUser, logout, updateProfile } = useAuthStore();
  const [email, setEmail] = useState('');
  const [bookPreferences, setBookPreferences] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authUser) {
      setEmail(authUser.email);
      setBookPreferences(authUser.bookPreferences.join(', '));
    }
  }, [authUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Le champ email est obligatoire");
      return;
    }
    if (newPassword && !oldPassword) {
      setError("Veuillez saisir l'ancien mot de passe pour changer le mot de passe");
      return;
    }
    setLoading(true);
    try {
      await updateProfile({ email, bookPreferences: bookPreferences.split(', '), oldPassword, newPassword });
      toast.success('Profil mis à jour avec succès');
    } catch (error) {
      toast.error('Erreur lors de la mise à jour du profil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Profil</h2>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Déconnexion
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Adresse email
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label htmlFor="bookPreferences" className="block text-sm font-medium text-gray-700">
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
          <div>
            <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">
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
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
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
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              disabled={loading}
            >
              {loading ? 'Mise à jour...' : 'Mettre à jour le profil'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;