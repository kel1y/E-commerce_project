/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import '../styles/cart.css';
import cartImage from '../assets/cart.svg';
import upward from '../assets/Upward.svg';
import downward from '../assets/Downward.svg';
import { getCart } from '../redux/slices/cart/getCart';
import spinner from '../assets/Icons/spinner.svg';
import { clearCart } from '../redux/slices/cart/clearCart';
import { deleteItemCart } from '../redux/slices/cart/deleteItemCart';
import { incrementCart } from '../redux/slices/cart/updateCart';
import { decrementCart } from '../redux/slices/cart/updateCart';
import { checkout } from '../redux/slices/cart/payment';
import { momoPay } from '../redux/slices/cart/momo';

export default function Cart() {
  const dispatch = useDispatch();
  const { existingItems, cartTotal, message } = useSelector(
    (state) => state.getCart.cart
  );
  const { cart } = useSelector((state) => state.getCart);
  const [currentCart, setCurrentCart] = useState({});
  const [isLoading, setLoading] = useState(false);
  const clearingCart = useSelector((state) => state.clearCart.loading);
  const deletingItemCart = useSelector((state) => state.deleteItemCart.loading);
  const updatingItemCart = useSelector((state) => state.update.loading);
  const [cartCleared, setCartCleared] = useState(false);
  const [cartUpdated, setCartUpdated] = useState(false);
  const checkingOut = useSelector((state) => state.checkout.loading);
  const paying = useSelector((state) => state.momoPay.loading);
  const [phoneError, setPhoneError] = useState('');
  const [formData, setFormData] = useState({
    phone: '',
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  useEffect(() => {
    dispatch(getCart());
    setCurrentCart(existingItems);
  }, [dispatch, isLoading]);

  useEffect(() => {
    if (cartCleared) {
      setCartCleared(false);
      dispatch(getCart());
    }
  }, [dispatch, cartCleared]);

  useEffect(() => {
    if (cartUpdated) {
      setCartUpdated(false);
      dispatch(getCart());
    }
  }, [dispatch, cartUpdated]);

  let items = {};
  if (existingItems !== undefined) {
    items = existingItems;
  }

  const handleClearCart = () => {
    dispatch(clearCart())
      .then(() => {
        setCartCleared(true);
      })
      .catch((error) => {
        toast.error('Failed to clear cart', error);
      });
  };

  const handleDeleteItemCart = async (id) => {
    setLoading(true);
    try {
      await dispatch(deleteItemCart(id));
      if (Object.values(existingItems).length === 1) {
        await dispatch(getCart());
      }
    } catch (error) {
      toast.error('Error while removing item from cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleIncrement = (id) => {
    dispatch(incrementCart(id)).then(() => {
      setCartUpdated(true);
    });
  };

  const handleDecrement = (id, quantity) => {
    if (quantity > 1) {
      dispatch(decrementCart(id)).then(() => {
        setCartUpdated(true);
      });
    } else {
      toast.warn('Quantity cannot be less than 1');
    }
  };
  const handleCheckout = () => {
    dispatch(checkout());
  };
  const handleMomoPay = (event) => {
    event.preventDefault();
    setPhoneError('');

    if (formData.phone === '') {
      setPhoneError('Phone number is required.');
      return;
    }
    if (!/^07[89]/.test(formData.phone)) {
      setPhoneError('Phone number must start with 078 or 079.');
      return;
    }
    if (formData.phone.length !== 10) {
      setPhoneError('Phone number must be 10 digits long.');
      return;
    }
    dispatch(momoPay(formData));
  };
  const handleCheckoutButton = () => {
    const checkoutButton =
      document.getElementsByClassName('cart-item-checkout')[0];
    checkoutButton.style.display = 'none';
    const momoButton = document.getElementsByClassName('momo-button')[0];
    momoButton.style.display = 'block';
    const stripeButton = document.getElementsByClassName('stripe-button')[0];
    stripeButton.style.display = 'block';
    toast.success('Choose your preferred mode of payment');
  };

  const handleMomoButton = () => {
    const momoNumberInput = document.getElementsByClassName('momo-number')[0];
    momoNumberInput.style.display = 'block';
    const momoPayButton = document.getElementsByClassName('momo-pay-button')[0];
    momoPayButton.style.display = 'block';
    const stripeButton = document.getElementsByClassName('stripe-button')[0];
    stripeButton.style.display = 'none';
    const momoButton = document.getElementsByClassName('momo-button')[0];
    momoButton.style.display = 'none';
  };

  return (
    <div className="cart-container" data-testid="cart-container">
      <div className="cart-header">
        <div className="cart-title">
          <p className="cart-name">Cart</p>
        </div>
      </div>
      <div className="cart-products-container">
        {cartTotal === 0 || message !== undefined ? (
          <div className="empty-cart-container">
            <div className="cart-image">
              <img src={cartImage} alt="cart" className="cart-icon-cart" />
            </div>
            <div className="cart-message-container">
              <p className="cart-message">Cart is Empty</p>
            </div>
          </div>
        ) : (
          <div className="cart-filled-container" style={{ display: 'block' }}>
            <div className="cart-cards-container" data-testid="cart-card">
              {Object.values(items).map((item) => (
                <div className="cart-card" key={item.id}>
                  <img
                    className="cart-item-image"
                    src={item.image}
                    alt="cart-item"
                  />
                  <p data-testid="cart-item-name" className="cart-item-name">
                    {item.productName}
                  </p>
                  <p data-testid="cart-item-price" className="cart-item-price">
                    RWF{item.price}
                  </p>
                  <div className="cart-item-quantity">
                    <button
                      data-testid="increment"
                      type="submit"
                      disabled={updatingItemCart}
                      onClick={() => handleIncrement(item.id, item.quantity)}
                      className="cart-item-increase"
                    >
                      <img src={upward} alt="upward-icon" />
                    </button>
                    <p
                      data-testid="cart-item-number"
                      className="cart-item-number"
                    >
                      {item.quantity}
                    </p>
                    <button
                      data-testid="decrement"
                      type="submit"
                      onClick={() => handleDecrement(item.id, item.quantity)}
                      disabled={updatingItemCart}
                      className="cart-item-decrease"
                    >
                      <img src={downward} alt="upward-icon" />
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="cart-item-remove"
                    onClick={() => handleDeleteItemCart(item.id)}
                    disabled={deletingItemCart[item.id]}
                  >
                    {deletingItemCart[item.id] ? (
                      <img
                        src={spinner}
                        style={{ height: '25px' }}
                        alt="loader"
                      />
                    ) : (
                      'Remove'
                    )}
                  </button>
                </div>
              ))}
            </div>
            <div className="cart-payment-container">
              <div className="cart-total-payment">
                <p className="cart-total-title">Total</p>
                <p className="cart-total-amount">RWF{cartTotal}</p>
              </div>
              <div className="cart-buttons-container">
                <button
                  type="submit"
                  className="cart-item-clear"
                  onClick={handleClearCart}
                  disabled={clearingCart}
                >
                  {clearingCart ? (
                    <img
                      src={spinner}
                      style={{
                        height: '30px',
                        filter: 'brightness(0) invert(1)',
                      }}
                      alt="loader"
                    />
                  ) : (
                    'CLEAR CART'
                  )}
                </button>
                <button
                  type="submit"
                  className="cart-item-checkout"
                  onClick={() => handleCheckoutButton()}
                >
                  CHECKOUT
                </button>
                <button
                  type="submit"
                  className="momo-button"
                  onClick={() => handleMomoButton()}
                  style={{ display: 'none' }}
                >
                  MTN MoMo
                </button>
                <form className="momo-pay-form" onSubmit={handleMomoPay}>
                  {' '}
                  <input
                    name="phone"
                    placeholder="Phone number"
                    style={{ display: 'none' }}
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="momo-number"
                  />
                  {phoneError && (
                    <div className="error-message" style={{ color: 'red' }}>
                      {phoneError}
                    </div>
                  )}
                  <button
                    type="submit"
                    className="momo-pay-button"
                    style={{ display: 'none' }}
                  >
                    {' '}
                    {paying ? (
                      <img
                        src={spinner}
                        style={{
                          height: '30px',
                          filter: 'brightness(0) invert(1)',
                        }}
                        alt="loader"
                      />
                    ) : (
                      'PAY'
                    )}
                  </button>
                </form>

                <button
                  type="submit"
                  onClick={handleCheckout}
                  disabled={checkingOut}
                  className="stripe-button"
                  style={{ display: 'none' }}
                >
                  {' '}
                  {checkingOut ? (
                    <img
                      src={spinner}
                      style={{
                        height: '30px',
                        filter: 'brightness(0) invert(1)',
                      }}
                      alt="loader"
                    />
                  ) : (
                    'STRIPE'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
