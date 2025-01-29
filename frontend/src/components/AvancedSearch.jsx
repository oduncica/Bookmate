import React, { useState } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import BookCard from "./BookCard";
import useLibraryStore from "../store/useLibraryStore";
import Modal from "react-modal";
import logo from "../images/logo.png"; // Assurez-vous que le chemin est correct

const GOOGLE_BOOKS_API_KEY = "AIzaSyDWPZhU3bhsZDl_CgpGjaaKiXOCt4xoRJU";

const AdvancedSearch = () => {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("");
  const [type, setType] = useState("");
  const [publishedAfter, setPublishedAfter] = useState("");
  const [publishedBefore, setPublishedBefore] = useState("");
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const addToReadBook = useLibraryStore((state) => state.addToReadBook);
  const addReadBook = useLibraryStore((state) => state.addReadBook);
  const addDislikedBook = useLibraryStore((state) => state.addDislikedBook);

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
      console.error("Erreur de recherche:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchBooks();
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
      if (category === "toRead") {
        await addToReadBook(bookData);
        alert('Livre ajouté à la catégorie "à lire"');
      } else if (category === "read") {
        await addReadBook(bookData);
        alert('Livre ajouté à la catégorie "Lu"');
      } else if (category === "disliked") {
        await addDislikedBook(bookData);
        alert('Livre ajouté à la catégorie "Pas intéressé"');
      }
    } catch (error) {
      console.error(
        `Erreur lors de l'ajout du livre à la catégorie "${category}":`,
        error
      );
    }
  };

  const openModal = (book) => {
    setSelectedBook(book);
  };

  const closeModal = () => {
    setSelectedBook(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-[#3A3A64] min-h-screen">
      <h1 className="text-1xl font-bold text-center mb-8">
        Recherche avancée de livres
      </h1>
      <div className="search-container mb-8">
        <div className="flex items-center mb-4 relative">
          <img src={logo} alt="Logo" className="h-10 mr-4" />
          <FaSearch
            className="absolute left-14 top-3 text-gray-400 cursor-pointer"
            onClick={searchBooks}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Recherche"
            className="w-full p-2 pl-16 border border-gray-300 rounded-lg"
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-gray-500 hover:bg-gray-700 text-white p-2 rounded-lg flex items-center ml-2"
          >
            <FaFilter className="mr-2" />
            Filtres
          </button>
        </div>
        {showFilters && (
          <div className="search-filters grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="language" className="block text-white">
                Langue :
              </label>
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
              <label htmlFor="type" className="block text-white">
                Type de contenu :
              </label>
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
              <label htmlFor="publishedAfter" className="block text-white">
                Publié après :
              </label>
              <input
                type="date"
                id="publishedAfter"
                value={publishedAfter}
                onChange={(e) => setPublishedAfter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label htmlFor="publishedBefore" className="block text-white">
                Publié avant :
              </label>
              <input
                type="date"
                id="publishedBefore"
                value={publishedBefore}
                onChange={(e) => setPublishedBefore(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
        )}
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
              description: book.volumeInfo.description || "",
              image: book.volumeInfo.imageLinks?.thumbnail || "",
              categories: book.volumeInfo.categories || [],
            }}
            onAddToRead={() => addToLibrary(book, "toRead")}
            onAddToReadBooks={() => addToLibrary(book, "read")}
            onAddToDislikedBooks={() => addToLibrary(book, "disliked")}
            onShowDetails={() => openModal(book)}
            isLibraryView={false}
          />
        ))}
      </div>
      {selectedBook && (
        <Modal
          isOpen={!!selectedBook}
          onRequestClose={closeModal}
          contentLabel="Détails du Livre"
          className="modal bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-20"
          overlayClassName="overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">
              {selectedBook.volumeInfo.title}
            </h2>
            <p className="text-gray-700 mb-2">
              {Array.isArray(selectedBook.volumeInfo.authors)
                ? selectedBook.volumeInfo.authors.join(", ")
                : "Auteur inconnu"}
            </p>
            <p className="text-gray-700 mb-2">
              {selectedBook.volumeInfo.publishedDate}
            </p>
            <p className="text-gray-700 mb-4">
              {selectedBook.volumeInfo.description}
            </p>
            <a
              href={`https://books.google.com/books?id=${selectedBook.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Voir sur Google Books
            </a>
            <div className="mt-4">
              <button
                onClick={closeModal}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Fermer
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdvancedSearch;
