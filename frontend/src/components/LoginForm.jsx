import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // État pour gérer la visibilité du mot de passe

  const { login, loading } = useAuthStore();

  return (
    <form
      className="space-y-6 font-nunito"
      onSubmit={(e) => {
        e.preventDefault();
        login({ email, password });
      }}
    >
      
      <div>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Adresse e-mail" // Placeholder en français
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm font-nunito"
          />
        </div>
      </div>

      <div>
        <div className="mt-1 relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"} // Utilisation de l'état pour basculer le type
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe" // Placeholder en français
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm font-nunito"
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

      <div>
        <button
          type="submit"
          className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-custom-orange hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-orange ${
            loading ? "cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Se connecter"}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
