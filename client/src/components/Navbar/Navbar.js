import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-brand" onClick={() => navigate(('/'))}>
        <img src="/images/logo.png" alt="Logo" className="nav-logo" />
      </div>

  
      <div className="hamburger" onClick={toggleMenu}>
        <span className={`bar ${isOpen ? 'active' : ''}`}></span>
        <span className={`bar ${isOpen ? 'active' : ''}`}></span>
        <span className={`bar ${isOpen ? 'active' : ''}`}></span>
      </div>


      <div className={`nav-links ${isOpen ? 'active' : ''}`}>
        <a href="/" className="nav-link">Home</a>
        <a href="/" className="nav-link">Features</a>
        <a href="/" className="nav-link">Contact</a>
      </div>
    </nav>
  );
};

export default Navbar;
