import React from 'react';

const ProfilePage = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Profil</h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-lg"><strong>Email:</strong> user@example.com</p>
        <p className="text-lg"><strong>Genres préférés:</strong> Fiction, Mystery</p>
        <p className="text-lg"><strong>Auteurs préférés:</strong> John Doe, Jane Smith</p>
      </div>
    </div>
  );
};

export default ProfilePage;