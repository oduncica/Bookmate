// import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import { signup } from '../../api';

// const Signup = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const history = useHistory();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await signup({ email, password });
//       history.push('/login');
//     } catch (error) {
//       console.error('Erreur d\'inscription:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
//       <h2 className="text-2xl font-bold mb-4">Inscription</h2>
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//         required
//         className="w-full p-2 mb-4 border border-gray-300 rounded"
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Mot de passe"
//         required
//         className="w-full p-2 mb-4 border border-gray-300 rounded"
//       />
//       <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">S'inscrire</button>
//     </form>
//   );
// };

// export default Signup;