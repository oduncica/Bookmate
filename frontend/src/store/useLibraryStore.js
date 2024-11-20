import { create } from 'zustand';
import axiosInstance from '../lib/axios'; // Importez l'instance Axios par défaut
import toast from 'react-hot-toast';

const useLibraryStore = create((set) => ({
  toReadBooks: [],
  readBooks: [],
  dislikedBooks: [],
  loading: false,

  fetchToReadBooks: async () => {
    try {
      set({ loading: true });
      const response = await axiosInstance.get('/library/to-read');
      set({ toReadBooks: response.data.toReadBooks });
    } catch (error) {
      toast.error('Error fetching to-read books');
    } finally {
      set({ loading: false });
    }
  },

  fetchReadBooks: async () => {
    try {
      set({ loading: true });
      const response = await axiosInstance.get('/library/read');
      set({ readBooks: response.data.readBooks });
    } catch (error) {
      toast.error('Error fetching read books');
    } finally {
      set({ loading: false });
    }
  },

  fetchDislikedBooks: async () => {
    try {
      set({ loading: true });
      const response = await axiosInstance.get('/library/dislike');
      set({ dislikedBooks: response.data.dislikedBooks });
    } catch (error) {
      toast.error('Error fetching disliked books');
    } finally {
      set({ loading: false });
    }
  },

  addToReadBook: async (book) => {
    try {
      set({ loading: true });
      const response = await axiosInstance.post('/library/to-read', book);
      set((state) => ({ toReadBooks: [...state.toReadBooks, response.data.book] }));
      toast.success('Book added to "To Read"');
    } catch (error) {
      toast.error('Error adding book to "To Read"');
    } finally {
      set({ loading: false });
    }
  },

  addReadBook: async (book) => {
    try {
      set({ loading: true });
      const response = await axiosInstance.post('/library/read', book);
      set((state) => ({ readBooks: [...state.readBooks, response.data.book] }));
      toast.success('Book added to "Read"');
    } catch (error) {
      toast.error('Error adding book to "Read"');
    } finally {
      set({ loading: false });
    }
  },

  addDislikedBook: async (book) => {
    try {
      set({ loading: true });
      const response = await axiosInstance.post('/library/dislike', book);
      set((state) => ({ dislikedBooks: [...state.dislikedBooks, response.data.book] }));
      toast.success('Book added to "Disliked"');
    } catch (error) {
      toast.error('Error adding book to "Disliked"');
    } finally {
      set({ loading: false });
    }
  },

  updateBook: async (bookId, bookData) => {
    try {
      set({ loading: true });
      const response = await axiosInstance.put(`/library/book/${bookId}`, bookData);
      set((state) => ({
        toReadBooks: state.toReadBooks.map((book) => (book._id === bookId ? response.data.book : book)),
        readBooks: state.readBooks.map((book) => (book._id === bookId ? response.data.book : book)),
        dislikedBooks: state.dislikedBooks.map((book) => (book._id === bookId ? response.data.book : book)),
      }));
      toast.success('Book updated successfully');
    } catch (error) {
      toast.error('Error updating book');
    } finally {
      set({ loading: false });
    }
  },

  deleteToReadBook: async (bookId) => {
    try {
      set({ loading: true });
      await axiosInstance.delete(`/library/to-read/${bookId}`);
      set((state) => ({ toReadBooks: state.toReadBooks.filter((book) => book._id !== bookId) }));
      toast.success('Book removed from "To Read"');
    } catch (error) {
      toast.error('Error removing book from "To Read"');
    } finally {
      set({ loading: false });
    }
  },

  deleteReadBook: async (bookId) => {
    try {
      set({ loading: true });
      await axiosInstance.delete(`/library/read/${bookId}`);
      set((state) => ({ readBooks: state.readBooks.filter((book) => book._id !== bookId) }));
      toast.success('Book removed from "Read"');
    } catch (error) {
      toast.error('Error removing book from "Read"');
    } finally {
      set({ loading: false });
    }
  },

  deleteDislikedBook: async (bookId) => {
    try {
      set({ loading: true });
      await axiosInstance.delete(`/library/dislike/${bookId}`);
      set((state) => ({ dislikedBooks: state.dislikedBooks.filter((book) => book._id !== bookId) }));
      toast.success('Book removed from "Disliked"');
    } catch (error) {
      toast.error('Error removing book from "Disliked"');
    } finally {
      set({ loading: false });
    }
  },
}));

export default useLibraryStore;