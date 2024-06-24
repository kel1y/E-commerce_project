/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import falcon from '../assets/Icons/Logo.svg';
import '../styles/signup.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav data-testid="nav" className="nav">
      <div className="falcon">
        <img src={falcon} alt="logo" />
      </div>
      <input
        type="checkbox"
        id="toggle"
        className="toggle"
        checked={isOpen}
        onChange={handleClick}
      />
      <label htmlFor="toggle" className="toggle-btn">
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </label>
      <ul className={`nav-options ${isOpen ? 'open' : ''}`}>
        <li className="option">
          <Link to="/" onClick={handleClick}>
            Home
          </Link>
        </li>
        <li className="option">
          <a href="#" onClick={handleClick}>
            About
          </a>
        </li>
        <li className="option">
          <a href="#" onClick={handleClick}>
            Pages
          </a>
        </li>
        <li className="option">
          <a href="#" onClick={handleClick}>
            Contact
          </a>
        </li>
        <li className="option">
          <Link to="/signin" onClick={handleClick}>
            Signin
          </Link>
        </li>
        <li className="option">
          <Link to="/register" onClick={handleClick}>
            Register
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
