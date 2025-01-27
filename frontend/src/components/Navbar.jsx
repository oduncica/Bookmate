import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { FaFire, FaBook, FaSearch, FaUser } from "react-icons/fa";

const Navbar = () => {
  const { authUser } = useAuthStore();

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-[#FFEED6] p-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-black hover:text-gray-700 flex flex-col items-center"
        >
          <FaFire className="mb-1" style={{ color: "#EE753E" }} />
          Match
        </Link>
        <Link
          to="/library"
          className="text-black hover:text-gray-700 flex flex-col items-center"
        >
          <FaBook className="mb-1" style={{ color: "#3A3A64" }} />
          Biblio
        </Link>
        <Link
          to="/search"
          className="text-black hover:text-gray-700 flex flex-col items-center"
        >
          <FaSearch className="mb-1" />
          Recherche
        </Link>
        <Link
          to="/profile"
          className="text-black hover:text-gray-700 flex flex-col items-center"
        >
          <FaUser className="mb-1" style={{ color: "#3A3A64" }} />
          Profil
        </Link>
      </nav>
    </>
  );
};

export default Navbar;
