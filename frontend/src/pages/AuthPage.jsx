import { useState } from "react";
import LoginForms from "../components/LoginForm";
import SignUpForms from "../components/SignUpForm";
const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-6 overflow-auto"
      style={{
        backgroundImage: "url('/bg_image.png')", // Image de fond (si applicable)
        backgroundSize: "200%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#543787", // Violet de fond
      }}
    >
      <div className="w-full max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-white mb-8 font-platypi">
          {isLogin ? "Connexion à Bookmate" : "Créer un compte sur Bookmate"}
        </h2>
        <div className="bg-white bg-opacity-20 shadow-xl rounded-lg p-8">
          {isLogin ? <LoginForms /> : <SignUpForms />}
        </div>
        <div className="mt-8 text-center">
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
