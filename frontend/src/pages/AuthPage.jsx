import { useState } from 'react';
import LoginForms from '../components/LoginForm';

import SignUpForms from '../components/SignUpForm';


const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);



  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-red-500 to-pink-500 p-4'>


      <div className='w-full max-w-md'>
        <h2 className='text-center text-3x1 font-extrabold text-white mb-8'>
          {isLogin ? 'Connexion à bookmate' : 'Creer un compte sur bookmate'} 

        </h2>

        <div className='bg-white shadow-xl rounded-lg p-8'>
          {isLogin ? <LoginForms /> : <SignUpForms />}
        </div>

        <div className='mt-8 text-center'>
          <p className='text-sm text-gray-600'>
            {isLogin ? "Nouveau sur bookmate ?" : "Vous avez déjà un compte ?"}
          </p>

          <button 
            onClick={() => setIsLogin(prevIsLogin => !prevIsLogin)}
            className='mt-2 text-red-600 hover:text-red-800 font-medium transition-colors duration-300'
          >
            {isLogin ? 'Creer un compte' : 'Se connecter'}

          </button>

        </div>


      </div>


    </div>
 
  );
};

export default AuthPage;