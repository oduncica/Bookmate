import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const Navbar = () => {
  const { authUser, logout } = useAuthStore();

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          <Link to="/">Bookmate</Link>
        </div>
        <div className="flex space-x-4">
          <Link to="/home" className="text-white hover:text-gray-200">Home</Link>
          {authUser && <Link to="/search" className="text-white hover:text-gray-200">Search</Link>}
          {authUser && <Link to="/library" className="text-white hover:text-gray-200">Library</Link>}
          {authUser ? (
            <button onClick={logout} className="text-white hover:text-gray-200">Logout</button>
          ) : (
            <Link to="/auth" className="text-white hover:text-gray-200">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;