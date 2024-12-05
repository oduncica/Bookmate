import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import LibraryView from "./pages/LibraryView";
import AdvancedSearch from "./components/AvancedSearch";

import Navbar from "./components/Navbar";
import { useAuthStore } from "./store/useAuthStore";

function App() {
  const { checkAuth, authUser, checkingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth) return null;

  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={!authUser ? <AuthPage /> : <Navigate to="/home" />} />
          <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/auth" />} />
          <Route path="/library" element={authUser ? <LibraryView /> : <Navigate to="/auth" />} />
          <Route path="/search" element={<AdvancedSearch />} />


        </Routes>
      </div>
      <Toaster />
    </div>
  );
}

export default App;