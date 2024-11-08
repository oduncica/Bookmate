import React, { useEffect, useState } from 'react';
import { getBooksFromLibrary } from '../../api';

const Library = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const token = localStorage.getItem('token');
      const response = await getBooksFromLibrary(token);
      setBooks(response.data);
    };
    fetchBooks();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Ma Bibliothèque</h2>
      <ul className="bg-white shadow-md rounded-lg p-6">
        {books.map((book) => (
          <li key={book.bookId} className="mb-2">
            <strong>{book.title}</strong> par {book.authors.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Library;