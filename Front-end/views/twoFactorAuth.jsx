/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import spinner from '../assets/spinner.svg';
import Input from '../components/InputField';
import shop from '../assets/Icons/shopsignup.svg';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/twoFactorAuth.css';
import { twoFactorAuth } from '../redux/slices/user/twoFactorAuth';

const Two_FactorAuth = () => {
  const OTPtoken = localStorage.getItem('OTPtoken');
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.twoFactorAuth);
  const [showOtp, setShowOtp] = useState(true);
  const toggleOtpVisibility = () => setShowOtp(!showOtp);

  const [otpError, setotpError] = useState('');

  const [formData, setFormData] = useState({
    otp: '',
    OTPtoken,
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
    if (!formData.otp) {
      setotpError('Invalid otp');
      return;
    }
    if (formData.otp === '') {
      setotpError('otp is required.');
      return;
    }
    if (formData.otp.length < 6 || !/^\d+$/.test(formData.otp)) {
      setotpError('otp must be at least 6 numbers long..');
      return;
    }
    dispatch(twoFactorAuth({ otp: formData.otp, OTPtoken: formData.OTPtoken }));
  };

  return (
    <div data-testid="otp-auth " className="otp-auth ">
      <div className="shadow">
        <div className="circle1" />
        <div className="circle2" />
      </div>
      <div className="container">
        <div className="otp-auth -welcome-msg">
          <p className="msg-1">Two Factor Authentication</p>
          <div className="otp-auth ">
            <p className="msg-3">Enter Auth Code Sent To Your Email</p>
          </div>
        </div>
        <img className="shop-icon" src={shop} alt="shop-icon" />
        <div className="form-div">
          <form className="form" onSubmit={handleSubmit}>
            <div className="password-input-container">
              <Input
                type={showOtp ? 'text' : 'password'}
                name="otp"
                placeholder="Otp Code"
                value={formData.otp}
                onChange={handleInputChange}
                className={otpError ? 'error' : ''}
              />
              {otpError && (
                <div className="error-message" style={{ color: 'red' }}>
                  {otpError}
                </div>
              )}
              <span
                style={{ display: 'none' }}
                className="password-icon"
                onClick={toggleOtpVisibility}
              >
                <FontAwesomeIcon
                  icon={showOtp ? faEyeSlash : faEye}
                  style={{ color: '#b8bcc2' }}
                />
              </span>
            </div>
            <button data-testid="signin-form" type="submit" disabled={loading}>
              {loading ? (
                <img src={spinner} style={{ height: '25px' }} alt="loader" />
              ) : (
                'Send'
              )}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Two_FactorAuth;
