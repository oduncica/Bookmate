import React, { useState } from 'react';
import { FaBook, FaCheck } from 'react-icons/fa';

const AddBookForm = ({ onAddToRead, onAddRead }) => {
  const [book, setBook] = useState({
    googleBookId: '',
    title: '',
    authors: '',
    description: '',
    image: '',
    publishedDate: '',
    categories: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleSubmitToRead = (e) => {
    e.preventDefault();
    onAddToRead({
      ...book,
      authors: book.authors.split(',').map((author) => author.trim()),
      categories: book.categories.split(',').map((category) => category.trim()),
    });
    setBook({
      googleBookId: '',
      title: '',
      authors: '',
      description: '',
      image: '',
      publishedDate: '',
      categories: '',
    });
  };

  const handleSubmitRead = (e) => {
    e.preventDefault();
    onAddRead({
      ...book,
      authors: book.authors.split(',').map((author) => author.trim()),
      categories: book.categories.split(',').map((category) => category.trim()),
    });
    setBook({
      googleBookId: '',
      title: '',
      authors: '',
      description: '',
      image: '',
      publishedDate: '',
      categories: '',
    });
  };

  return (
    <div className="max-w-lg mx-auto my-8 p-4 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">Ajouter un Livre</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="googleBookId">
            Google Book ID
          </label>
          <input
            type="text"
            name="googleBookId"
            value={book.googleBookId}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Titre
          </label>
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="authors">
            Auteurs (séparés par des virgules)
          </label>
          <input
            type="text"
            name="authors"
            value={book.authors}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            name="description"
            value={book.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
            URL de l'image
          </label>
          <input
            type="text"
            name="image"
            value={book.image}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="publishedDate">
            Date de publication
          </label>
          <input
            type="text"
            name="publishedDate"
            value={book.publishedDate}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categories">
            Catégories (séparées par des virgules)
          </label>
          <input
            type="text"
            name="categories"
            value={book.categories}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex justify-between">
          <button
            onClick={handleSubmitToRead}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center focus:outline-none focus:shadow-outline"
          >
            <FaBook className="mr-2" />
            Ajouter à "À Lire"
          </button>
          <button
            onClick={handleSubmitRead}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center focus:outline-none focus:shadow-outline"
          >
            <FaCheck className="mr-2" />
            Ajouter à "Lu"
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBookForm;