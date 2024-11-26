import { useAuthStore } from '../store/useAuthStore';
import React, { useEffect, useState } from 'react';
import { useSuggestionsStore } from '../store/useSuggestionsStore'; // Utilisez le nouveau store
import TinderBookCard from '../components/TinderBookCard';
import { useSwipeable } from 'react-swipeable';

const HomePage = () => {
  const { suggestions, fetchSuggestions, likeBook, dislikeBook, readBook } = useSuggestionsStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchSuggestions();
  }, [fetchSuggestions]);

  const handleSwipe = (direction) => {
    if (direction === 'left' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (direction === 'right' && currentIndex < suggestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('left'),
    onSwipedRight: () => handleSwipe('right'),
  });

  return (
    <div className="container mx-auto px-4 py-8 bg-[#3A3A64] min-h-screen" {...handlers}>
      <h1 className="text-4xl font-bold text-center mb-8 text-white">BookMate</h1>
      <div className="flex justify-center items-center h-screen">
        {Array.isArray(suggestions) && suggestions.length > 0 ? (
          <TinderBookCard
            book={suggestions[currentIndex]}
            onLike={likeBook}
            onDislike={dislikeBook}
            onRead={readBook}
          />
        ) : (
          <p className="text-center text-xl text-white">Aucune suggestion de livre disponible.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;