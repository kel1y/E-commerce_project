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
import { signup } from '../redux/slices/user/signup';
import { Link } from 'react-router-dom';

const Signup = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.signup.loading);
  const [firstnameError, setFirstnameError] = useState('');
  const [lastnameError, setLastnameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
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
    setFirstnameError('');
    setLastnameError('');
    setEmailError('');
    setPasswordError('');

    if (formData.firstname === '') {
      setFirstnameError('First name is required.');
      return;
    }
    if (formData.firstname.length < 3) {
      setFirstnameError('First name must be at least 3 characters');
      return;
    }
    if (formData.lastname === '') {
      setLastnameError('Last name is required.');
      return;
    }
    if (formData.lastname.length < 3) {
      setLastnameError('Last name must be at least 3 characters');
      return;
    }

    if (formData.email === '') {
      setEmailError('Email is required.');
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

    dispatch(signup(formData));
  };

  return (
    <div data-testid="signup" className="signup">
      <div className="shadow">
        <div className="circle1" />
        <div className="circle2" />
      </div>
      <div className="container">
        <div className="welcome-msg">
          <p className="msg-1">Sign Up</p>
          <div className="signin-link">
            <p className="msg-2">Already a user?</p>
            <Link className="link" to="/signin">
              sign in!
            </Link>
          </div>
        </div>
        <img className="shop-icon" src={shop} alt="shop-icon" />
        <div className="signup-form-div">
          <form className="signup-form" onSubmit={handleSubmit}>
            <Input
              type="text"
              name="firstname"
              placeholder="Firstname"
              value={formData.firstname}
              onChange={handleInputChange}
              className={firstnameError ? 'error' : ''}
            />
            {firstnameError && (
              <div className="error-message" style={{ color: 'red' }}>
                {firstnameError}
              </div>
            )}
            <Input
              type="text"
              name="lastname"
              placeholder="Lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              className={lastnameError ? 'error' : ''}
            />
            {lastnameError && (
              <div className="error-message" style={{ color: 'red' }}>
                {lastnameError}
              </div>
            )}
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
                className="password-icon-signup"
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  style={{ color: '#b8bcc2', margin: "-40px" }}
                />
              </span>
            </div>
            <button data-testid="signup-form" type="submit" disabled={loading}>
              {loading ? (
                <img src={spinner} style={{ height: '25px' }} alt="loader" />
              ) : (
                'Sign up'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
