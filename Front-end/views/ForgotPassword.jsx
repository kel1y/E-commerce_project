/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import spinner from '../assets/spinner.svg';
import Input from '../components/InputField';
import shop from '../assets/Icons/shopsignup.svg';
import 'react-toastify/dist/ReactToastify.css';
import { ForgotPassword } from '../redux/slices/user/forgotpassword';
import '../styles/forgotPassword.css';

const Forgot_Password = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.forgotPassword.loading);

  const [emailError, setEmailError] = useState();
  const [formData, setFormData] = useState({
    email: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setEmailError('');
    if (formData.email === '') {
      setEmailError('Email is required.');
      return;
    }
    dispatch(ForgotPassword(formData));
  };

  return (
    <div data-testid="forgot-password" className="forgot-password">
      <div className="shadow">
        <div className="circle1" />
        <div className="circle2" />
      </div>
      <div className="container">
        <div className="forgot-password-welcome-msg">
          <p className="msg-1">Forgot your password</p>
          <div className="forgot-password">
            <p className="msg-3">
              No need to worry, fill out your email address and we’ll send you
              the password-reset instructions.
            </p>
          </div>
        </div>
        <img className="shop-icon" src={shop} alt="shop-icon" />
        <div className="form-div">
          <form className="form" onSubmit={handleSubmit}>
            <Input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleInputChange}
              className={emailError ? 'error' : ''}
            />
            {emailError && (
              <div className="error-message" style={{ color: 'red' }}>
                {emailError}
              </div>
            )}
            <button data-testid="forgot-password-form" type="submit" disabled={loading}>
              {loading ? (
                <img src={spinner} style={{ height: '25px' }} alt="loader" />
              ) : (
                'Send'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forgot_Password;
