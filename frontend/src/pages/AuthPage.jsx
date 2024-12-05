import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className='min-h-screen flex items-center justify-center bg-[#3A3A64] p-4'>
      <div className='w-full max-w-md'>
        <h2 className='text-center text-3xl font-extrabold text-white mb-8'>
          {isLogin ? 'Connexion à BookMate' : 'Créer un compte sur BookMate'}
        </h2>
        <div className='bg-white shadow-xl rounded-lg p-8'>
          {isLogin ? <LoginForm /> : <SignUpForm />}
        </div>
        <div className='mt-8 text-center'>
          <p className='text-sm text-gray-600'>
            {isLogin ? "Nouveau sur BookMate ?" : "Vous avez déjà un compte ?"}
          </p>
          <button 
            onClick={() => setIsLogin(prevIsLogin => !prevIsLogin)}
            className='mt-2 text-red-600 hover:text-red-800 font-medium transition-colors duration-300'
          >
            {isLogin ? 'Créer un compte' : 'Se connecter'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;