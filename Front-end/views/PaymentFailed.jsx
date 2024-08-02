/* eslint-disable import/no-unresolved */
import React from 'react';
import { Link } from 'react-router-dom';
import shop from '../assets/Icons/shopsignup.svg';
import '../styles/checkout.css';

export default function PaymentFailed() {
  const handleGoHome = () => {
    localStorage.removeItem('cart');
  };
  return (
    <div data-testid="checkout-success" className="checkout-success-container">
      <img className="shop-icon-checkout" src={shop} alt="shop-icon" />
      <p className="success-message-checkout">Payment canceled! Try again</p>
      <Link className="checkout-home" to="/" onClick={handleGoHome}>
        Click to go back Home
      </Link>
    </div>
  );
}
