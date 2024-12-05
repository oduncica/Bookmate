import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFire } from "react-icons/fa";
import axios from '../lib/axios';

const genres = [
  "Fiction",
  "Non-fiction",
  "Mystère",
  "Fantaisie",
  "Romance",
  "Science-fiction",
  "Biographie",
  "Histoire",
  "Enfants",
  "Santé",
  "Voyage",
  "Cuisine",
  "Art",
  "Religion",
  "Poésie",
  "Bandes dessinées",
  "Drame",
  "Aventure",
  "Horreur",
  "Humour",
  "Philosophie",
  "Politique",
  "Économie",
  "Éducation",
  "Technologie",
  "Sport",
  "Musique",
  "Théâtre"
];

const PreferencesForm = () => {
  const [bookPreferences, setBookPreferences] = useState([]);
  const navigate = useNavigate();

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setBookPreferences([...bookPreferences, value]);
    } else {
      setBookPreferences(bookPreferences.filter((genre) => genre !== value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/preferences', { bookPreferences });
      navigate("/home");
    } catch (error) {
      console.error('Erreur lors de la mise à jour des préférences:', error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-[#543787] min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold text-white mb-4">Dites-nous en plus sur vos goûts...</h2>
      <h3 className="text-xl font-semibold text-yellow-400 mb-6">Sélectionnez vos genres préférés</h3>
      <form className="space-y-6 w-full max-w-2xl" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {genres.map((genre) => (
            <div key={genre} className="flex items-center justify-center">
              <input
                id={`prefer-${genre.toLowerCase()}`}
                name="book-preferences"
                type="checkbox"
                value={genre}
                checked={bookPreferences.includes(genre)}
                onChange={handleCheckboxChange}
                className="hidden"
              />
              <label
                htmlFor={`prefer-${genre.toLowerCase()}`}
                className={`cursor-pointer py-2 px-4 border-2 rounded-full text-white text-center ${
                  bookPreferences.includes(genre) ? "bg-pink-600 border-pink-600" : "border-white"
                }`}
                style={{ fontSize: "1rem", whiteSpace: "nowrap", minWidth: "100px" }} // Taille fixe et ajustement au texte
              >
                {genre}
              </label>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500`}
          >
            <FaFire className="mr-2" />Découvrir mes recommandations
          </button>
        </div>
      </form>
    </div>
  );
};

export default PreferencesForm;