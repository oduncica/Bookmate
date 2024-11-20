import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import BookCard from './BookCard';
import useLibraryStore from '../store/useLibraryStore'; // Importez le store de la bibliothèque

// const GOOGLE_BOOKS_API_KEY = "";

const AdvancedSearch = () => {
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('');
  const [type, setType] = useState('');
  const [publishedAfter, setPublishedAfter] = useState('');
  const [publishedBefore, setPublishedBefore] = useState('');
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  const addToReadBook = useLibraryStore((state) => state.addToReadBook); // Utilisez la fonction addToReadBook du store
  const addReadBook = useLibraryStore((state) => state.addReadBook); // Utilisez la fonction addReadBook du store
  const addDislikedBook = useLibraryStore((state) => state.addDislikedBook); // Utilisez la fonction addDislikedBook du store

  const searchBooks = async () => {
    let url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${GOOGLE_BOOKS_API_KEY}`;

    if (language) {
      url += `&langRestrict=${language}`;
    }
    if (type) {
      url += `&filter=${type}`;
    }
    if (publishedAfter) {
      url += `&publishedDate=${publishedAfter}`;
    }
    if (publishedBefore) {
      url += `&publishedDate=${publishedBefore}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      setBooks(data.items || []);
    } catch (error) {
      console.error('Erreur de recherche:', error);
    }
  };

  const addToLibrary = async (book, category) => {
    const bookData = {
      googleBookId: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      description: book.volumeInfo.description,
      image: book.volumeInfo.imageLinks?.thumbnail,
      publishedDate: book.volumeInfo.publishedDate,
      categories: book.volumeInfo.categories,
    };

    try {
      if (category === 'toRead') {
        await addToReadBook(bookData);
        alert('Livre ajouté à la catégorie "à lire"');
      } else if (category === 'read') {
        await addReadBook(bookData);
        alert('Livre ajouté à la catégorie "Lu"');
      } else if (category === 'disliked') {
        await addDislikedBook(bookData);
        alert('Livre ajouté à la catégorie "Pas intéressé"');
      }
    } catch (error) {
      console.error(`Erreur lors de l'ajout du livre à la catégorie "${category}":`, error);
    }
  };

  const showBookDetails = (book) => {
    setSelectedBook(book.volumeInfo);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Recherche avancée de livres</h1>
      <div className="search-container mb-8">
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un livre..."
            className="w-full p-2 border border-gray-300 rounded-l-lg"
          />
          <button
            onClick={searchBooks}
            className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-r-lg flex items-center"
          >
            <FaSearch className="mr-2" />
            Rechercher
          </button>
        </div>
        <div className="search-filters grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="language" className="block text-gray-700">Langue :</label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Tout</option>
              <option value="fr">Français</option>
              <option value="en">Anglais</option>
              <option value="es">Espagnol</option>
            </select>
          </div>
          <div>
            <label htmlFor="type" className="block text-gray-700">Type de contenu :</label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Tout</option>
              <option value="books">Livres imprimés</option>
              <option value="ebooks">Livres numériques</option>
            </select>
          </div>
          <div>
            <label htmlFor="publishedAfter" className="block text-gray-700">Publié après :</label>
            <input
              type="date"
              id="publishedAfter"
              value={publishedAfter}
              onChange={(e) => setPublishedAfter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label htmlFor="publishedBefore" className="block text-gray-700">Publié avant :</label>
            <input
              type="date"
              id="publishedBefore"
              value={publishedBefore}
              onChange={(e) => setPublishedBefore(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
      </div>
      <div className="book-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={{
              id: book.id,
              googleBookId: book.id,
              title: book.volumeInfo.title,
              authors: book.volumeInfo.authors || [],
              description: book.volumeInfo.description || '',
              image: book.volumeInfo.imageLinks?.thumbnail || '',
              categories: book.volumeInfo.categories || [],
            }}
            onAddToRead={() => addToLibrary(book, 'toRead')}
            onAddToReadBooks={() => addToLibrary(book, 'read')}
            onAddToDislikedBooks={() => addToLibrary(book, 'disliked')}
            onShowDetails={() => showBookDetails(book)}
            isLibraryView={false}
          />
        ))}
      </div>
      {selectedBook && (
        <div className="book-detail mt-8 p-4 border border-gray-300 rounded-lg bg-gray-50">
          <h2 className="text-2xl font-bold mb-4">Détails du livre</h2>
          <div className="flex flex-col md:flex-row">
            <img src={selectedBook.imageLinks?.thumbnail || 'https://via.placeholder.com/128x192?text=No+Image'} alt="Couverture" className="mb-4 md:mb-0 md:mr-4" />
            <div>
              <h3 className="text-xl font-bold">{selectedBook.title}</h3>
              <p className="text-gray-700 mb-2"><strong>Auteurs :</strong> {selectedBook.authors?.join(', ') || 'Auteur inconnu'}</p>
              <p className="text-gray-700 mb-2"><strong>Description :</strong> {selectedBook.description || 'Aucune description disponible'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch;