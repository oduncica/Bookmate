import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const genres = [
  "Fiction",
  "Non-Fiction",
  "Mystery",
  "Fantasy",
  "Romance",
  "Science Fiction",
  "Biography",
  "History",
  "Children",
  "Self-Help",
  "Health",
  "Travel",
  "Cooking",
  "Art",
  "Religion",
  "Poetry",
  "Comics",
  "Drama",
  "Adventure",
  "Horror"
];

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // État pour gérer la visibilité du mot de passe
  const [bookPreferences, setBookPreferences] = useState([]);

  const { signup, loading } = useAuthStore();

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setBookPreferences([...bookPreferences, value]);
    } else {
      setBookPreferences(bookPreferences.filter((genre) => genre !== value));
    }
  };

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        signup({ email, password, bookPreferences });
      }}
    >
      {/* EMAIL */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email address
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

      {/* PASSWORD */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="mt-1 relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"} // Utilisation de l'état pour basculer le type
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)} // Bascule de la visibilité du mot de passe
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        </div>
      </div>

      {/* BOOK PREFERENCE */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Book Preferences</label>
        <div className="mt-2 grid grid-cols-2 gap-4">
          {genres.map((genre) => (
            <div key={genre} className="flex items-center">
              <input
                id={`prefer-${genre.toLowerCase()}`}
                name="book-preferences"
                type="checkbox"
                value={genre}
                checked={bookPreferences.includes(genre)}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
              />
              <label htmlFor={`prefer-${genre.toLowerCase()}`} className="ml-2 block text-sm text-gray-900">
                {genre}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
      <button
      type="submit"
      className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
        loading
          ? "bg-custom-orange cursor-not-allowed"
          : "bg-custom-orange hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-orange"
      }`}
      disabled={loading}
      >
      {loading ? "Signing up..." : "Sign up"}
    </button>
      </div>
    </form>
  );
};

export default SignUpForm;