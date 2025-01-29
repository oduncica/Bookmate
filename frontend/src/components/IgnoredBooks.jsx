import React, { useEffect, useState } from "react";
import useLibraryStore from "../store/useLibraryStore";
import BookCard from "./BookCard";

const IgnoredBooks = () => {
  const { dislikedBooks, fetchDislikedBooks, deleteDislikedBook } =
    useLibraryStore();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchDislikedBooks();
  }, [fetchDislikedBooks]);

  const handleDelete = async (bookId) => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer ce livre?"
    );
    if (confirmDelete) {
      await deleteDislikedBook(bookId);
    }
  };

  const filteredBooks = (books) => {
    return books.filter((book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const booksToDisplay = filteredBooks(dislikedBooks);

  return (
    <div className="container mx-auto px-4 py-8 bg-[#3A3A64] min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">
        Mes livres ignorés
      </h1>
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher un livre..."
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="book-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {booksToDisplay.map((book) => (
          <BookCard
            key={book._id}
            book={book}
            onDelete={() => handleDelete(book._id)}
            isLibraryView={true}
          />
        ))}
      </div>
    </div>
  );
};

export default IgnoredBooks;
