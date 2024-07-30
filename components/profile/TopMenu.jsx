/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/Icons/Logo.svg';

const TopMenu = () => {
  return (
    <div className="profile-navbar-container">
      <div className="navbar-links">
        <div className="navbar-logo">
          <Link to="/">
          <img src={Logo} className="logo-jet" alt="avatar" />
          </Link>
        </div>
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="chechbtn">
          <i className="fa fa-bars" />
        </label>
        <ul>
          <div className="links">
            <li>
              <Link to="/" className="links">
                Home
              </Link>
            </li>
            <li>
              <Link to="/" className="links">
                about
              </Link>
            </li>
            <li>
              <Link to="/" className="links">
                pages
              </Link>
            </li>
            <li>
              <Link to="/" className="links">
                contact
              </Link>
            </li>
            <li>
              <Link to="/update-password" className="links">
                security
              </Link>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default TopMenu;
