import React, { useState } from 'react';

const questionnaire = () => {
  const genres = [
    "Horreur",
    "Romance",
    "Santé et bien-être",
    "Musique",
    "Réaliste",
    "Thriller",
    "Mystère",
    "Recettes",
    "Non-fiction",
    "Technologie",
    "Philosophie",
    "Jeune adulte",
    "Coming of age",
    "Poésie",
    "Histoire",
    "Arts",
    "Performing arts",
    "Science",
    "Psychologie",
    "Sports",
  ];

  const [selectedGenres, setSelectedGenres] = useState([]);

  // Fonction pour gérer la sélection de genres
  const handleSelectGenre = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre)); // Désélectionner
    } else {
      setSelectedGenres([...selectedGenres, genre]); // Ajouter
    }
  };

  const handleSubmit = () => {
    if (selectedGenres.length === 0) {
      alert("Veuillez sélectionner au moins un genre avant de soumettre.");
    } else {
      alert(`Genres sélectionnés : ${selectedGenres.join(", ")}`);
      console.log("Genres sélectionnés :", selectedGenres);
    }
  };

  // Définir une couleur pour chaque genre sélectionné
  const genreColors = {
    "Horreur": "bg-custom-blue",
    "Romance": "bg-custom-orange",
    "Santé et bien-être": "bg-custom-yellow",
    "Musique": "bg-custom-green",
    "Réaliste": "bg-light-blue",
    "Thriller": "bg-light-yellow",
    "Mystère": "bg-light-pink",
    "Recettes": "bg-soft-pink",
    "Non-fiction": "bg-lavender",
    "Technologie": "bg-blue-light",
    "Philosophie": "bg-custom-blue",
    "Jeune adulte": "bg-dark-green",
    "Coming of age": "bg-orange",
    "Poésie": "bg-light-blue",
    "Histoire": "bg-custom-green",
    "Arts": "bg-light-yellow",
    "Performing arts": "bg-custom-orange",
    "Science": "bg-light-pink",
    "Psychologie": "bg-soft-pink",
    "Sports": "bg-lavender",
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-start p-6"
      style={{
        backgroundImage: "url('/bg_image.png')",
        backgroundSize: '200%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#543787', // Couleur violette de fond
      }}
    >
      {/* Titre */}
      <h1 className="text-3xl font-bold text-white mb-4 text-center font-platypi">
        Dites-nous en plus sur vos goûts...
      </h1>
      {/* Sous-titre */}
      <h2 className="text-xl font-bold text-white mb-8 text-center font-nunito">
        Quels genres de livres aimez-vous ?
      </h2>

      {/* Boutons des genres */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {genres.map((genre, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-full border font-bold text-white font-nunito ${
              selectedGenres.includes(genre)
                ? `${genreColors[genre]} border-${genreColors[genre].slice(3)}` // Appliquer la couleur sélectionnée
                : "bg-transparent border-white text-white" // Style par défaut
            }`}
            onClick={() => handleSelectGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Bouton de soumission */}
      <button
        onClick={handleSubmit}
        className="bg-custom-orange text-white font-bold px-6 py-3 rounded-full flex items-center hover:bg-orange-600 font-nunito"
      >
        <img
          src="/flame_icon_white.png"
          alt="Flamme"
          className="mr-2"
          style={{ width: '15px', height: '23px' }}
        />
        Découvrir mes recommandations
      </button>
    </div>
  );
};

export default questionnaire;
