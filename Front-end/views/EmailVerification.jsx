import React from 'react';
import shop from '../assets/Icons/shopsignup.svg';
import { Link, useParams } from 'react-router-dom';
import '../styles/verification.css';

export const EmailVerification = () => {
  const { status } = useParams();
  return (
    <div className="verification-container">
      <img className="shop-icon-verification" src={shop} alt="shop-icon" />
      <div className="verification-details">
        {status === 'success' && (
          <label className="verification-sucess">
            Your email has been verified successfully! you can now proceed to
            signin, happy shopping!
          </label>
        )}
        {status === 'failed' && (
          <label className="verification-failed">
            Verification failed, unfortunately your email could not be verified,
            please contact support for any further steps.
          </label>
        )}

        <div className="verification-blurred-round-things">
          <div className="circle1" />
          <div className="circle2" />
        </div>
        <div className="verification-links">
          {status === 'success' && (
            <Link className="verification-link-to" to={'/signin'}>
              Signin
            </Link>
          )}

          <Link className="verification-link-to" to={'/'}>
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};
