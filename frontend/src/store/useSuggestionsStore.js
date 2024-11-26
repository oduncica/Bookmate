import { create } from 'zustand';
import axios from '../lib/axios';

export const useSuggestionsStore = create((set) => ({
  suggestions: [],
  fetchSuggestions: async () => {
    try {
      const response = await axios.get('/match/suggestions');
      set({ suggestions: response.data });
    } catch (error) {
      console.error('Erreur lors de la récupération des suggestions de livres:', error.response?.data?.message || error.message);
      set({ suggestions: [] }); // Assurez-vous que suggestions est toujours un tableau
    }
  },
  likeBook: async (bookId) => {
    try {
      await axios.post(`/match/like/${bookId}`);
      set((state) => ({
        suggestions: state.suggestions.filter((book) => book.id !== bookId),
      }));
    } catch (error) {
      console.error('Erreur lors de l\'ajout du livre à la catégorie "à lire":', error.response?.data?.message || error.message);
    }
  },
  dislikeBook: async (bookId) => {
    try {
      await axios.post(`/match/dislike/${bookId}`);
      set((state) => ({
        suggestions: state.suggestions.filter((book) => book.id !== bookId),
      }));
    } catch (error) {
      console.error('Erreur lors de l\'ajout du livre à la catégorie "Pas intéressé":', error.response?.data?.message || error.message);
    }
  },
  readBook: async (bookId) => {
    try {
      await axios.post(`/match/read/${bookId}`);
      set((state) => ({
        suggestions: state.suggestions.filter((book) => book.id !== bookId),
      }));
    } catch (error) {
      console.error('Erreur lors de l\'ajout du livre à la catégorie "Lu":', error.response?.data?.message || error.message);
    }
  },
}));