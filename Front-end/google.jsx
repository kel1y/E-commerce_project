import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import googleIcon from '../assets/Icons/Google.svg';

const GoogleLoginButton = () => {
  const { VITE_GOOGLE_SERVER_URL } = process.env
  const formRef = useRef();
  const { response } = useParams();

  const handleLogin = (event) => {
    event.preventDefault();
    formRef.current.submit();
  };

  useEffect(() => {
    if (response) {
      const { token } = JSON.parse(response);
      if (token) {
        localStorage.setItem('token', token);
        window.location.href = '/';
      }
    }
  }, [response]);

  return (
    <div>
      <form
        ref={formRef}
        action={`${VITE_GOOGLE_SERVER_URL}/auth/google`}
        method="GET"
        style={{ display: 'none' }}
      ></form>
      <a className="google-button-login" href="#" onClick={handleLogin}>
        <img src={googleIcon} alt="Google Icon" />
      </a>
    </div>
  );
};

export default GoogleLoginButton;
