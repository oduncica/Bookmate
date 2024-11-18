// import React, { useEffect, useState } from 'react';
// import { suggestBooks } from '../../api';

// const Suggestions = () => {
//   const [books, setBooks] = useState([]);

//   useEffect(() => {
//     const fetchSuggestions = async () => {
//       const token = localStorage.getItem('token');
//       const response = await suggestBooks(token);
//       setBooks(response.data);
//     };
//     fetchSuggestions();
//   }, []);

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Suggestions de Livres</h2>
//       <ul className="bg-white shadow-md rounded-lg p-6">
//         {books.map((book) => (
//           <li key={book.id} className="mb-2">
//             <strong>{book.volumeInfo.title}</strong> par {book.volumeInfo.authors.join(', ')}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Suggestions;