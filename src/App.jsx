import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Topic from './components/topic/Topic';
import Questions from './components/questions/Questions';
import './App.css';

function App() {
  // Initialize selectedSheet from localStorage or default to 'sheet3'
  const [selectedSheet, setSelectedSheet] = useState(() => {
    const savedSheet = localStorage.getItem('selectedSheet');
    return savedSheet || 'sheet3';
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? savedMode === 'true' : false;
  });

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  const handleSheetChange = (sheet) => {
    setSelectedSheet(sheet);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem('darkMode', newMode.toString());
      return newMode;
    });
  };

  return (
    <Router>
      <div className="app">
        <Navbar 
          selectedSheet={selectedSheet}
          onSheetChange={handleSheetChange}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <main className="main">
          <Routes>
            <Route 
              path="/" 
              element={<Topic selectedSheet={selectedSheet} />} 
            />
            <Route 
              path="/questions/:topicName" 
              element={<Questions selectedSheet={selectedSheet} />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
