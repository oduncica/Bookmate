import React, { useEffect, useState } from "react";
import { FaBook, FaCheck } from "react-icons/fa";
import useLibraryStore from "../store/useLibraryStore";
import BookCard from "../components/BookCard";

const LibraryView = () => {
  const {
    toReadBooks,
    readBooks,
    fetchToReadBooks,
    fetchReadBooks,
    deleteToReadBook,
    deleteReadBook,
  } = useLibraryStore();

  const [activeTab, setActiveTab] = useState("toRead");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(10);

  useEffect(() => {
    fetchToReadBooks();
    fetchReadBooks();
  }, [fetchToReadBooks, fetchReadBooks]);

  const handleDelete = async (bookId, category) => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer ce livre?"
    );
    if (confirmDelete) {
      if (category === "toRead") {
        await deleteToReadBook(bookId);
      } else if (category === "read") {
        await deleteReadBook(bookId);
      }
    }
  };

  const filteredBooks = (books) => {
    return books.filter((book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const paginateBooks = (books) => {
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    return books.slice(indexOfFirstBook, indexOfLastBook);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = (totalBooks) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="pagination flex justify-center mt-4">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={`px-4 py-2 mx-1 border rounded ${
              currentPage === number ? "bg-yellow-200" : "bg-white"
            }`}
          >
            {number}
          </button>
        ))}
      </div>
    );
  };

  const booksToDisplay =
    activeTab === "toRead"
      ? paginateBooks(filteredBooks(toReadBooks))
      : paginateBooks(filteredBooks(readBooks));

  return (
    <div className="container mx-auto px-4 py-8 bg-[#3A3A64] min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">
        Ma Bibliothèque
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
      <div className="tabs mb-8 flex justify-center">
        <button
          className={`tab ${
            activeTab === "toRead" ? "bg-yellow-200" : ""
          } flex items-center px-4 py-2 mx-2 rounded-lg border border-gray-300`}
          onClick={() => setActiveTab("toRead")}
        >
          <FaBook className="mr-2" />À lire
        </button>
        <button
          className={`tab ${
            activeTab === "read" ? "bg-yellow-200" : ""
          } flex items-center px-4 py-2 mx-2 rounded-lg border border-gray-300`}
          onClick={() => setActiveTab("read")}
        >
          <FaCheck className="mr-2" />
          Lu
        </button>
      </div>
      <div className="book-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {booksToDisplay.map((book) => (
          <BookCard
            key={book._id}
            book={book}
            onDelete={() => handleDelete(book._id, activeTab)}
            isLibraryView={true}
          />
        ))}
      </div>
      {renderPagination(
        activeTab === "toRead"
          ? filteredBooks(toReadBooks).length
          : filteredBooks(readBooks).length
      )}
    </div>
  );
};

export default LibraryView;
