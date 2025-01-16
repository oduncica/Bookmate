import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import Questionnaire from "./components/Questionnaire";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
	const { checkAuth, authUser, checkingAuth } = useAuthStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	if (checkingAuth) return null;

	return (
		<div className='absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]'>
			<Routes>
      <Route path='/' element={<HomePage />  } />
				<Route path='/auth' element={!authUser ? <AuthPage /> : <Navigate to={"/"} />} />
				<Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to={"/auth"} />} />
				<Route path='/questionnaire' element={ <Questionnaire /> } />
			</Routes>

			<Toaster />
		</div>
	);
}

export default App;