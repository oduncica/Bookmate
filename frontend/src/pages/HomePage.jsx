import React, { useEffect, useState } from "react";
import { useSuggestionsStore } from "../store/useSuggestionsStore"; // Utilisez le nouveau store
import TinderBookCard from "../components/TinderBookCard";
import { useSwipeable } from "react-swipeable";

const HomePage = () => {
  const { suggestions, fetchSuggestions, likeBook, dislikeBook, readBook } =
    useSuggestionsStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchSuggestions();
  }, [fetchSuggestions]);

  const handleSwipe = (direction) => {
    if (direction === "right" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (direction === "left" && currentIndex < suggestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
  });

  const handleLike = async (bookId) => {
    await likeBook(bookId);
    setCurrentIndex((prevIndex) =>
      prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const handleDislike = async (bookId) => {
    await dislikeBook(bookId);
    setCurrentIndex((prevIndex) =>
      prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const handleRead = async (bookId) => {
    await readBook(bookId);
    setCurrentIndex((prevIndex) =>
      prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  return (
    <div
      className="container mx-auto px-4 py-8 bg-[#3A3A64] min-h-screen flex flex-col items-center justify-center"
      {...handlers}
    >
      {/* <h3 className="text-4xl font-bold text-center mb-8 text-white">
        BookMate
      </h3> */}
      <div className="flex justify-center items-center w-full h-full">
        {Array.isArray(suggestions) && suggestions.length > 0 ? (
          <TinderBookCard
            book={suggestions[currentIndex]}
            onLike={handleLike}
            onDislike={handleDislike}
            onRead={handleRead}
          />
        ) : (
          <p className="text-center text-xl text-white">
            Aucune suggestion de livre disponible.
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
