import React from 'react';
import { FaHeartBroken, FaBookOpen, FaFire } from 'react-icons/fa';

const TinderBookCard = ({ book, onLike, onDislike, onRead }) => {
  return (
    <div className="max-w-xs rounded-lg overflow-hidden shadow-lg m-2 bg-white text-black transform transition-transform duration-300 ease-in-out">
      {book.volumeInfo.imageLinks ? (
        <img className="w-full h-60 object-cover" src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
      ) : (
        <div className="w-full h-60 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">Image non disponible</span>
        </div>
      )}
      <div className="px-4 py-2">
        <div className="font-bold text-lg mb-2">{book.volumeInfo.title}</div>
        <p className="text-gray-700 text-sm">
          {Array.isArray(book.volumeInfo.authors) ? book.volumeInfo.authors.join(', ') : 'Auteur inconnu'}
        </p>
      </div>
      <div className="px-4 pt-2 pb-2">
        {Array.isArray(book.volumeInfo.categories) && book.volumeInfo.categories.map((category) => (
          <span key={category} className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">
            #{category}
          </span>
        ))}
      </div>
      <div className="px-4 py-2 flex justify-center space-x-4">
        <button
          onClick={() => onDislike(book.id)}
          className="bg-[#F3CD4A] hover:bg-yellow-600 text-white font-bold p-4 rounded-full flex items-center justify-center text-2xl"
          title="Pas intéressé"
        >
          <FaHeartBroken />
        </button>
        <button
          onClick={() => onLike(book.id)}
          className="bg-[#67AAB3] hover:bg-teal-700 text-white font-bold p-4 rounded-full flex items-center justify-center text-2xl"
          title="À lire"
        >
          <FaBookOpen />
        </button>
        <button
          onClick={() => onRead(book.id)}
          className="bg-[#EE753E] hover:bg-orange-700 text-white font-bold p-4 rounded-full flex items-center justify-center text-2xl"
          title="Lu"
        >
          <FaFire />
        </button>
      </div>
    </div>
  );
};

export default TinderBookCard;