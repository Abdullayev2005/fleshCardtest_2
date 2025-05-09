import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage'; // Bosh sahifa
import Flashcard from './components/Flashcard'; // Flashcard sahifasi

function App() {
  return (
    <Router>
      <Routes>
        {/* Bosh sahifa */}
        <Route path="/" element={<HomePage />} />
        
        {/* Flashcard sahifasi */}
        <Route path="/flashcard/:lesson" element={<Flashcard />} />
      </Routes>
    </Router>
  );
}

export default App;
