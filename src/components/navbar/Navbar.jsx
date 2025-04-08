import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ selectedSheet, onSheetChange, isDarkMode, toggleDarkMode }) {
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link to="/" className="navbar__logo">
          DSA CRACKER
        </Link>
        
        <div className="navbar__right">
          <div className="navbar__sheet-selector">
            <select 
              value={selectedSheet} 
              onChange={(e) => onSheetChange(e.target.value)}
              className="navbar__select"
            >
              <option value="sheet3">Love Babar</option>
              <option value="sheet1">Arsh </option>
              <option value="sheet2">Fraz </option>
            </select>
          </div>
          
          <button 
            className="navbar__darkmode" 
            onClick={toggleDarkMode}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            <i className={`uil ${isDarkMode ? 'uil-sun' : 'uil-moon'}`}></i>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
