import React from 'react';
import { FaBook, FaCheck, FaTimes, FaInfoCircle } from 'react-icons/fa';

const BookCard = ({ book, onAddToRead, onAddToReadBooks, onAddToDislikedBooks, onShowDetails, onDelete, isLibraryView }) => {
  return (
    <div className="max-w-xs rounded-lg overflow-hidden shadow-lg m-2 bg-white text-black">
      {book.image ? (
        <img className="w-full h-40 object-cover" src={book.image} alt={book.title} />
      ) : (
        <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">Image non disponible</span>
        </div>
      )}
      <div className="px-4 py-2">
        <div className="font-bold text-md mb-2">{book.title}</div>
        <p className="text-gray-700 text-xs">
          {book.authors.join(', ')}
        </p>
      </div>
      <div className="px-4 pt-2 pb-2">
        {book.categories.map((category) => (
          <span key={category} className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">
            #{category}
          </span>
        ))}
      </div>
      <div className="px-4 py-2 flex justify-center">
        <a
          href={`https://books.google.com/books?id=${book.googleBookId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700 font-bold py-1 px-2 rounded flex items-center"
        >
          Voir sur Google Books
        </a>
      </div>
      {!isLibraryView && (
        <div className="px-4 py-2 flex justify-center space-x-2">
          <button
            onClick={() => onAddToRead(book)}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded flex items-center"
            title="Ajouter à 'à lire'"
          >
            <FaBook />
          </button>
          <button
            onClick={() => onAddToReadBooks(book)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded flex items-center"
            title="Ajouter à 'Lu'"
          >
            <FaCheck />
          </button>
          <button
            onClick={() => onAddToDislikedBooks(book)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded flex items-center"
            title="Ajouter à 'Pas intéressé'"
          >
            <FaTimes />
          </button>
        </div>
      )}
      {isLibraryView && (
        <div className="px-4 py-2 flex justify-center">
          <button
            onClick={() => onDelete(book._id)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded flex items-center"
            title="Supprimer"
          >
            <FaTimes />
          </button>
        </div>
      )}
      {!isLibraryView && (
        <div className="px-4 py-2 flex justify-center">
          <button
            onClick={() => onShowDetails(book)}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded flex items-center"
            title="Voir les détails"
          >
            <FaInfoCircle className="mr-2" />
            Détails
          </button>
        </div>
      )}
    </div>
  );
};

export default BookCard;