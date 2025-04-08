import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Select } from 'antd';
import './Navbar.css';

function Navbar({ selectedSheet, onSheetChange, isDarkMode, toggleDarkMode }) {
  const { Option } = Select;
  const location = useLocation();
  
  // Check if we're on the questions page
  const isQuestionsPage = location.pathname.includes('/questions/');

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link to="/" className="navbar__logo">
          DSA CRACKER
        </Link>
        
        <div className="navbar__right">
          {!isQuestionsPage && (
            <div className="navbar__sheet-selector">
              <Select
                value={selectedSheet}
                onChange={onSheetChange}
                className="navbar__select"
                dropdownClassName="navbar__select-dropdown"
              >
                <Option value="sheet3">Love Babar</Option>
                <Option value="sheet1">Arsh</Option>
                <Option value="sheet2">Fraz</Option>
              </Select>
            </div>
          )}
          
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
