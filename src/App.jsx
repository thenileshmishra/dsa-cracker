import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/navbar/Navbar';
import Topic from './components/topic/Topic';
import Questions from './components/questions/Questions';
import './App.css';

function App() {
  const [selectedSheet, setSelectedSheet] = useState('sheet3');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const handleSheetChange = (sheet) => {
    setSelectedSheet(sheet);
    console.log(sheet);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
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
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Topic selectedSheet={selectedSheet} />} />
            <Route path="/questions/:topicName" element={<Questions selectedSheet={selectedSheet} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
