import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { FaFire } from "react-icons/fa";

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
  "Théâtre",
];

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [bookPreferences, setBookPreferences] = useState([]);
  const [currentStep, setCurrentStep] = useState(1); // Gérer l'étape du formulaire

  const { signup, loading } = useAuthStore();
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
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }
    await signup({ email, password, bookPreferences }, navigate);
  };

  return (
    <form className="space-y-6 font-nunito" onSubmit={handleSubmit}>
      

      {/* Première partie du formulaire */}
      {currentStep === 1 && (
        <>
        {/* Texte de bienvenue */}
      <div className="text-center text-sm text-white mb-6">
        <p>Bienvenue parmi nous,</p>
        <p>L'aventure commence</p>
      </div>
          <div>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-transparent focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              />
              <label
                htmlFor="email"
                className="absolute left-3 top-2 text-gray-400 text-sm transition-all duration-200"
              >
                Adresse email
              </label>
            </div>
          </div>

          <div>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-transparent focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              />
              <label
                htmlFor="password"
                className="absolute left-3 top-2 text-gray-400 text-sm transition-all duration-200"
              >
                Mot de passe
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>

          <div>
            <div className="relative">
              <input
                id="confirm-password"
                name="confirm-password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-transparent focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              />
              <label
                htmlFor="confirm-password"
                className="absolute left-3 top-2 text-gray-400 text-sm transition-all duration-200"
              >
                Confirmer le mot de passe
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={() => setCurrentStep(2)} // Passer à la deuxième étape
              className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-custom-orange hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-orange ${
                loading ? "cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              Suivant
            </button>
          </div>
        </>
      )}

      {/* Deuxième partie du formulaire */}
      {currentStep === 2 && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Sélectionnez vos genres préférés
            </label>
            <div className="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {genres.map((genre) => (
                <div key={genre} className="flex items-center">
                  <input
                    id={`prefer-${genre.toLowerCase()}`}
                    name="book-preferences"
                    type="checkbox"
                    value={genre}
                    checked={bookPreferences.includes(genre)}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                  />
                  <label
                    htmlFor={`prefer-${genre.toLowerCase()}`}
                    className="ml-2 block text-sm text-gray-900"
                  >
                    {genre}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="mt-6">
            <button
              type="submit"
              className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-custom-orange hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-orange ${
                loading ? "cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? (
                "Inscription en cours..."
              ) : (
                <>
                  <FaFire className="mr-2" />
                  S'inscrire
                </>
              )}
            </button>
          </div>
        </>
      )}
    </form>
  );
};

export default SignUpForm;
