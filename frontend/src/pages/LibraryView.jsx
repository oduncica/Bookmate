import React, { useEffect, useState } from 'react';
import { FaBook, FaCheck, FaTimes } from 'react-icons/fa';
import useLibraryStore from '../store/useLibraryStore';
import BookCard from '../components/BookCard';

const LibraryView = () => {
  const {
    toReadBooks,
    readBooks,
    dislikedBooks,
    fetchToReadBooks,
    fetchReadBooks,
    fetchDislikedBooks,
    deleteToReadBook,
    deleteReadBook,
    deleteDislikedBook,
  } = useLibraryStore();

  const [activeTab, setActiveTab] = useState('toRead');

  useEffect(() => {
    fetchToReadBooks();
    fetchReadBooks();
    fetchDislikedBooks();
  }, [fetchToReadBooks, fetchReadBooks, fetchDislikedBooks]);


  const handleDelete = async (bookId, category) => {
    const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer ce livre?');
    if (confirmDelete) {
      if (category === 'toRead') {
        await deleteToReadBook(bookId);
      } else if (category === 'read') {
        await deleteReadBook(bookId);
      } else if (category === 'disliked') {
        await deleteDislikedBook(bookId);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Ma Bibliothèque</h1>
      <div className="tabs mb-8 flex justify-center">
        <button
          className={`tab ${activeTab === 'toRead' ? 'active' : ''} flex items-center px-4 py-2 mx-2 rounded-lg border border-gray-300`}
          onClick={() => setActiveTab('toRead')}
        >
          <FaBook className="mr-2" />
          À lire
        </button>
        <button
          className={`tab ${activeTab === 'read' ? 'active' : ''} flex items-center px-4 py-2 mx-2 rounded-lg border border-gray-300`}
          onClick={() => setActiveTab('read')}
        >
          <FaCheck className="mr-2" />
          Lu
        </button>
        <button
          className={`tab ${activeTab === 'disliked' ? 'active' : ''} flex items-center px-4 py-2 mx-2 rounded-lg border border-gray-300`}
          onClick={() => setActiveTab('disliked')}
        >
          <FaTimes className="mr-2" />
          Pas intéressé
        </button>
      </div>
      <div className="book-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeTab === 'toRead' && toReadBooks.map((book) => (
          <BookCard
            key={book._id}
            book={book}
            onDelete={() => handleDelete(book._id, 'toRead')}
            isLibraryView={true}
          />
        ))}
        {activeTab === 'read' && readBooks.map((book) => (
          <BookCard
            key={book._id}
            book={book}
            onDelete={() => handleDelete(book._id, 'read')}
            isLibraryView={true}
          />
        ))}
        {activeTab === 'disliked' && dislikedBooks.map((book) => (
          <BookCard
            key={book._id}
            book={book}
            onDelete={() => handleDelete(book._id, 'disliked')}
            isLibraryView={true}
          />
        ))}
      </div>
    </div>
  );
};

export default LibraryView;