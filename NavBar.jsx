/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getCart } from '../redux/slices/cart/getCart';
import '../styles/MainNavbar.css';

import {
  profile,
  notification,
  dashboard,
  cart,
  wishlist,
  home,
  Logo,
} from '../assets/index';
import SearchBar from './search/SearchBar';
import { Notifications } from '../views/notifications/Notifications';
import { notificationActions } from '../redux/slices/notifications/notificationSlice';

const NavBar = () => {
  const dispatch = useDispatch();

  const notificationDisplay = useSelector(
    (state) => state.notifications.display
  );
  const notificationCounter = useSelector(
    (state) => state.notifications.counter
  );
  const handleDisplay = () => {
    dispatch(notificationActions.setDisplay());
  };

  const token = localStorage.getItem('token');
  const cartState = useSelector((state) => state.getCart.cart);
  const existingItems = token ? cartState && cartState.existingItems : {};
  const [cartLength, setCartLength] = useState(0);
  const [cartRole, setCartRole] = useState('');
  const [sreenWidth, setScreenWidth] = useState(
    window.innerWidth || document.documentElement.clientWidth
  );

  window.onresize = function (event) {
    setScreenWidth(window.innerWidth || document.documentElement.clientWidth);
  };

  useEffect(() => {
    let decoded = null;
    let items = {};
    if (existingItems !== undefined) {
      items = existingItems;
    }
    if (token) {
      decoded = jwt_decode(token);
      const { role } = decoded.payload;
      setCartRole(role);
      if (role === 'buyer') {
        setCartLength(Object.keys(items).length);
      }
    }
  }, [existingItems, token]);
  useEffect(() => {
    let decoded = null;
    if (token) {
      decoded = jwt_decode(token);
      const { role } = decoded.payload;
      if (role === 'buyer') {
        dispatch(getCart());
      }
    }
  }, []);
   const handleCartClick = () => {
    if (cartRole !== 'buyer') {
      toast.error('You are not authorized to access the cart.');
    }
  };


  return (
    <div className="main-navbar-container" data-testid="navbar-test-id">
      <div className="navbar-logo-responsive">
        <Link to="/">
          <img src={Logo} alt="falcons" className="logo-navbar" />
        </Link>
      </div>
      <SearchBar />
      <div className="icons-container">
        <div className="home-icon">
          <Link to="/">
            <img src={home} alt="home" />
          </Link>
        </div>
        <div className="dashboard-icon">
        <Link
            to={
              cartRole === 'buyer'
                ? '/dashboard/orders'
                : cartRole === 'admin'
                ? '/dashboard/users'
                : '/dashboard'
            }
          >
        <img src={dashboard} alt="dashboard" />
        </Link>
        </div>
        <div className="cart-icon">
        <Link
            to={cartRole === 'buyer' ? '/cart' : ''}
            onClick={handleCartClick}
          >
            <img src={cart} alt="cart" />
          </Link>
          <span>{cartLength}</span>
        </div>
        <div className="notification-icon">
          <Link>
            <img
              src={notification}
              alt="notifications"
              onClick={handleDisplay}
            />
          </Link>
          <span>{notificationCounter || 0}</span>
          {localStorage.getItem('token') && (
            <Notifications
              bottom={!(sreenWidth > 1024)}
              top={40}
              leftMargin="0"
              display={notificationDisplay ? 'flex' : 'none'}
            />
          )}
        </div>
        <div className="profile-icon">
          <Link to="/profile">
            <img src={profile} alt="profile" />
          </Link>
        </div>
        <div className="wishlist-icon">
          <Link to="/wishlist">
            <img src={wishlist} alt="profile" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
