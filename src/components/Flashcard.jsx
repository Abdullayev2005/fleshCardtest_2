import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Volume2 } from 'lucide-react';

const Flashcard = () => {
  const { lesson } = useParams();
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isUzbekToEnglish, setIsUzbekToEnglish] = useState(true);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    fetch('/flashcards.json')
      .then(response => response.json())
      .then(json => {
        if (json[lesson]) {
          const randomizedFlashcards = randomizeCards(json[lesson]);
          setFlashcards(randomizedFlashcards);
        } else {
          alert("This lesson is not found!");
        }
      })
      .catch(error => console.error("Error:", error));
  }, [lesson]);

  const randomizeCards = (cards) => {
    return cards.sort(() => Math.random() - 0.5);
  };

  const handleCardClick = () => setIsFlipped(!isFlipped);

  const handleNext = () => {
    if (currentIndex + 1 < flashcards.length) {
      setIsFlipped(false);
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const toggleLanguage = () => {
    setIsUzbekToEnglish(!isUzbekToEnglish);
  };

  const handleRestart = () => {
    setIsFinished(false);
    setCurrentIndex(0);
    setFlashcards(randomizeCards(flashcards));
  };

  const speakEnglish = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance();
      utterance.lang = 'en-US';
      const currentCard = flashcards[currentIndex] || {};

      // Extract the English word from the front of the card
      const englishText = currentCard.front;

      if (englishText) {
        utterance.text = englishText;
        window.speechSynthesis.cancel(); // Stop any ongoing speech
        window.speechSynthesis.resume(); // Resume speech synthesis
        window.speechSynthesis.speak(utterance);
      }
    } else {
      alert("Your device doesn't support speech synthesis.");
    }
  };

  if (flashcards.length === 0) return <p>⏳ Loading...</p>;

  const currentCard = flashcards[currentIndex] || {};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-500 p-6">
      <div className="max-w-sm w-full p-6 bg-white shadow-xl rounded-lg">
        <div
          className="relative bg-gray-200 cursor-pointer p-6 rounded-lg hover:scale-105 transition-all"
          onClick={handleCardClick}
        >
          <h2 className="text-2xl font-semibold text-center">
            {isFlipped
              ? isUzbekToEnglish
                ? currentCard.back
                : currentCard.front
              : isUzbekToEnglish
              ? currentCard.front
              : currentCard.back}
          </h2>
        </div>
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-200"
          >
            Next
          </button>
          <button
            onClick={toggleLanguage}
            className="px-6 py-3 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition duration-200"
          >
            Switch Language
          </button>
          <button
            onClick={speakEnglish}
            className="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-200 flex items-center"
          >
            <Volume2 className="mr-2" />
            Speak
          </button>
        </div>
        {isFinished && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleRestart}
              className="px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-200"
            >
              Restart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Flashcard;
