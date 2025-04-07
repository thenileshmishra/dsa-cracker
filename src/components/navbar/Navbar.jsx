import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ toggleDarkMode, isDarkMode }) => {
  return (
    <nav className="navbar">
      <div className="nav__container container">
        <Link to="/" className="nav__logo">
          DSA CRACKER
        </Link>

        <div className="nav__right">
          <button 
            className="nav__darkmode" 
            onClick={toggleDarkMode}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            <i className={`uil ${isDarkMode ? 'uil-sun' : 'uil-moon'}`}></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
