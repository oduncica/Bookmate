import { useAuthStore } from '../store/useAuthStore';

const HomePage = () => {
  const {logout} = useAuthStore();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Bienvenue sur Bookmate</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default HomePage;