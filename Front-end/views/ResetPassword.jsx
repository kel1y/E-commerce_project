/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import spinner from '../assets/spinner.svg';
import Input from '../components/InputField';
import shop from '../assets/Icons/shopsignup.svg';
import 'react-toastify/dist/ReactToastify.css';
import { ResetPassword } from '../redux/slices/user/resetpassword';
import '../styles/forgotPassword.css';

const Reset_Password = () => {
  const token = useParams();
  const token_str = token.token;
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.resetPassword.loading);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmshowPassword, setconfirmShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const confirmtogglePasswordVisibility = () =>
    setconfirmShowPassword(!confirmshowPassword);

  const [passwordError, setPasswordError] = useState('');

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
    token: token_str,
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
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords must match');
      return;
    }
    if (formData.password === '') {
      setPasswordError('Password is required.');
      return;
    }
    if (
      formData.password.length < 8 ||
      !/[A-Z]/.test(formData.password) ||
      !/\d/.test(formData.password)
    ) {
      setPasswordError(
        'Password must be at least 8 characters long, include at least one uppercase letter, and at least one numeric digit.'
      );
      return;
    }
    if (formData.confirmPassword === '') {
      setPasswordError('Password is required.');
      return;
    }
    if (
      formData.confirmPassword.length < 8 ||
      !/[A-Z]/.test(formData.confirmPassword) ||
      !/\d/.test(formData.confirmPassword)
    ) {
      setPasswordError(
        'Password must be at least 8 characters long, include at least one uppercase letter, and at least one numeric digit.'
      );
      return;
    }
    dispatch(ResetPassword(formData));
  };

  return (
    <div data-testid="forgot-password" className="forgot-password">
      <div className="shadow">
        <div className="circle1" />
        <div className="circle2" />
      </div>
      <div className="container">
        <div className="forgot-password-welcome-msg">
          <p className="msg-1">Reset your Password</p>
          <div className="forgot-password">
            <p className="msg-3">
              Fill out your new password and confirm it in their respective
              fields.
            </p>
          </div>
        </div>
        <img className="shop-icon" src={shop} alt="shop-icon" />
        <div className="form-div">
          <form className="form" onSubmit={handleSubmit}>
            <div className="password-input-container">
              <Input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="New Password"
                value={formData.password}
                onChange={handleInputChange}
                className={passwordError ? 'error' : ''}
              />
              {passwordError && (
                <div className="error-message" style={{ color: 'red' }}>
                  {passwordError}
                </div>
              )}
              <span
                className="forgot-password-icon"
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon
                  className="forgot-password-icon"
                  icon={showPassword ? faEyeSlash : faEye}
                  style={{ color: '#b8bcc2' }}
                />
              </span>
            </div>
            <div className="password-input-container">
              <Input
                type={confirmshowPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm New Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={passwordError ? 'error' : ''}
              />
              {passwordError && (
                <div className="error-message" style={{ color: 'red' }}>
                  {passwordError}
                </div>
              )}
              <span
                className="forgot-password-icon"
                onClick={confirmtogglePasswordVisibility}
              >
                <FontAwesomeIcon
                  className="forgot-password-icon"
                  icon={confirmshowPassword ? faEyeSlash : faEye}
                  style={{ color: '#b8bcc2' }}
                />
              </span>
            </div>
            <button
              data-testid="forgot-password-form"
              type="submit"
              disabled={loading}
            >
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

export default Reset_Password;
