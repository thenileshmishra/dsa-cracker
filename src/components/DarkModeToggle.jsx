import { useState, useEffect } from 'react';

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check if user has a saved preference
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      return JSON.parse(savedMode);
    }
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Update body class and localStorage when dark mode changes
    document.body.classList.toggle('dark-mode', isDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="button button--flex"
      style={{
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        padding: '0.5rem',
        borderRadius: '50%',
        zIndex: 'var(--z-fixed)'
      }}
    >
      {isDarkMode ? (
        <i className="uil uil-sun" style={{ fontSize: '1.5rem' }}></i>
      ) : (
        <i className="uil uil-moon" style={{ fontSize: '1.5rem' }}></i>
      )}
    </button>
  );
};

export default DarkModeToggle; 