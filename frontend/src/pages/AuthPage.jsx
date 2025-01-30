import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  // Définir la position de l'image de fond en fonction de l'état de connexion
  const getBackgroundPosition = () => {
    return isLogin ? "center" : "top"; // ou toute autre valeur de position que tu préfères
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-6 overflow-auto"
      style={{
        backgroundImage: "url('/bg_image.png')",
        backgroundSize: "200%",
        backgroundPosition: getBackgroundPosition(),
        backgroundRepeat: "no-repeat",
        backgroundColor: "#3A3A64",
      }}
    >
      <img
        src="/logoHorizontal.png"
        alt="Bookmate Logo"
        className="absolute top-4 left-4"
      />
      <div className="w-full max-w-md text-center">
        <h3 className="text-2xl font-extrabold text-white mb-8 font-platypi">
          {isLogin ? "Se Connecter" : "Créer votre compte"}
        </h3>
        {isLogin ? <LoginForm /> : <SignUpForm />}
        <div className="mt-5">
          <p className="text-sm text-white font-nunito">
            {isLogin ? "Nouveau sur Bookmate ?" : "Vous avez déjà un compte ?"}
          </p>
          <button
            onClick={() => setIsLogin((prevIsLogin) => !prevIsLogin)}
            className="mt-2 text-white hover:text-gray-200 font-medium transition-colors duration-300"
          >
            {isLogin ? "Créer un compte" : "Se connecter"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
