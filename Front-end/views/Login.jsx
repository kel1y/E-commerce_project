/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import spinner from '../assets/spinner.svg';
import Input from '../components/InputField';
import shop from '../assets/Icons/shopsignup.svg';
import 'react-toastify/dist/ReactToastify.css';
import { signin } from '../redux/slices/user/login';
import '../styles/signin.css';
import GoogleLoginButton from '../components/google';

const Signin = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.signin.loading);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
    setPasswordError('');

    if (formData.email === '') {
      setEmailError('Email is required.');
      return;
    }

    if (formData.password === '') {
      setPasswordError('Password is required.');
      return;
    }

    dispatch(signin(formData));
  };

  return (
    <div data-testid="signin" className="signup">
      <div className="shadow">
        <div className="circle1" />
        <div className="circle2" />
      </div>
      <div className="container">
        <div className="welcome-msg-login">
          <p className="msg-1">Sign In</p>
          <div className="signup-link">
            <p className="msg-2">If you don&rsquo;t have an account you can</p>
            <Link className="link" to="/register">
              Register here!
            </Link>
          </div>
        </div>
        <img className="shop-icon-login" src={shop} alt="shop-icon" />
        <div className="signup-form-div">
          <form className="signup-form" onSubmit={handleSubmit}>
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
            <div className="password-input-container">
              <Input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
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
                className="password-icon-login"
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  style={{ color: '#b8bcc2' }}
                />
              </span>
            </div>
            <div className="login-update-password">
              <Link className="login-password-link" to="/forgot-password">
                Forgot Password?
              </Link>
            </div>
            <button data-testid="signin-form" type="submit" disabled={loading}>
              {loading ? (
                <img src={spinner} style={{ height: '25px' }} alt="loader" />
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          <p className="google-msg">Or continue with</p>
          <div className="google-line1" />
          <div className="google-line2" />
          <GoogleLoginButton />
        </div>
      </div>
    </div>
  );
};

export default Signin;
