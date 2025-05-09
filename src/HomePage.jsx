import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  const lessonNumbers = Array.from({ length: 25 }, (_, index) => index + 1);

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-semibold mb-6">Vocabulary</h1>
      <div className="grid grid-cols-2 gap-6">
        {lessonNumbers.map((lesson) => (
          <div key={lesson} className="flex justify-center">
            <Link to={`/flashcard/dars${lesson}`}>
              <button className="px-8 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-300 w-full">
                Dars {lesson}
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
