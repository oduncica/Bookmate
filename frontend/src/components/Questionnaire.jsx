import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { FaFire } from "react-icons/fa";
import logo from "../images/logo2.png"; // Import de l'image

const genres = {
  Fiction: [
    "Horreur",
    "Romance",
    "Réaliste",
    "Thriller",
    "Mystère",
    "Science-fiction",
    "Fantaisie",
    "Aventure",
    "Drame",
  ],
  "Non-fiction": [
    "Santé et bien-être",
    "Musique",
    "Recettes",
    "Technologie",
    "Philosophie",
    "Histoire",
    "Arts",
    "Science",
    "Psychologie",
    "Sports",
    "Essai",
    "Autobiographie",
    "Sociologie",
    "Environnement",
    "Développement personnel",
  ],
  "Jeune adulte": [
    "Coming of age",
    "Poésie",
    "Littérature LGBTQ+",
    "Littérature africaine",
    "Littérature asiatique",
    "Littérature latino-américaine",
    "Littérature européenne",
    "Littérature autochtone",
  ],
  Classique: [
    "Nouvelle",
    "Littérature française",
    "Classique",
    "Mythologie",
    "Contes de fées",
  ],
  Spécial: [
    "Voyage dans le temps",
    "Cyberpunk",
    "Steampunk",
    "Western",
    "Gothique",
    "Utopie/Dystopie",
    "Chick-lit",
  ],
  Biographie: ["Politique", "Scientifique", "Sportive", "Artistique"],
  Poésie: ["Épique", "Lyrique", "Satirique", "Narrative"],
  Théâtre: ["Comédie", "Tragédie", "Drame historique", "Théâtre de l'absurde"],
};

const getRandomColor = () => {
  const colors = [
    "bg-red-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
    "bg-orange-500",
    "bg-gray-500",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const Questionnaire = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [expandedGenres, setExpandedGenres] = useState({});
  const { signup, loading } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { email, password } = location.state;

  const handleSelectGenre = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleToggleExpand = (genre) => {
    setExpandedGenres((prev) => ({
      ...prev,
      [genre]: !prev[genre],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedGenres.length === 0) {
      alert("Veuillez sélectionner au moins un genre avant de soumettre.");
      return;
    }
    await signup(
      { email, password, bookPreferences: selectedGenres },
      navigate
    );
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-start p-6"
      style={{
        backgroundSize: "200%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#3A3A64", // Couleur de fond
      }}
    >
      <img src={logo} alt="Logo" className="mb-4 w-24 h-24 object-contain" />{" "}
      {/* Ajout de l'image */}
      <h3 className="text-3xl font-bold text-white mb-4 text-center font-platypi">
        Dites-nous en plus sur vos goûts...
      </h3>
      <h4
        className="text-xl font-bold mb-8 text-center font-nunito"
        style={{ color: "#F3CD4A" }}
      >
        Quels genres de livres aimez-vous ?
      </h4>
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {Object.entries(genres).map(([genre, subGenres], index) => (
          <div key={index} className="w-full">
            <h4 className="text-2xl font-bold text-white mb-2 text-center font-nunito">
              {genre}
            </h4>
            <div className="flex flex-wrap gap-4 justify-center mb-4">
              {(expandedGenres[genre] ? subGenres : subGenres.slice(0, 3)).map(
                (subGenre, subIndex) => (
                  <button
                    key={subIndex}
                    className={`px-4 py-2 rounded-full border font-bold text-white font-nunito transition-transform transform ${
                      selectedGenres.includes(subGenre)
                        ? `${getRandomColor()} border-${getRandomColor().slice(
                            3
                          )} scale-105`
                        : "bg-transparent border-white text-white hover:scale-105"
                    }`}
                    onClick={() => handleSelectGenre(subGenre)}
                  >
                    {subGenre}
                  </button>
                )
              )}
              {subGenres.length > 3 && (
                <button
                  className="px-4 py-2 rounded-full border font-bold font-nunito bg-gray-700 border-gray-500 text-white hover:bg-gray-600 hover:scale-105"
                  onClick={() => handleToggleExpand(genre)}
                >
                  {expandedGenres[genre] ? "Voir moins" : "Voir plus"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className={`w-full max-w-xs flex justify-center items-center py-2 px-3 border border-transparent rounded-full shadow-lg text-base font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-transform transform ${
          loading ? "cursor-not-allowed" : "hover:scale-105"
        }`}
        disabled={loading}
      >
        {loading ? (
          "Inscription en cours..."
        ) : (
          <>
            <FaFire className="mr-1" />
            Découvrir mes recommandations
          </>
        )}
      </button>
    </div>
  );
};

export default Questionnaire;
