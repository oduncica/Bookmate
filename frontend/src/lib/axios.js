import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:4000/api" : "/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Assurez-vous que les cookies sont envoyés avec chaque requête
});

// Ajouter un intercepteur pour inclure le token JWT dans les en-têtes des requêtes
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
