import React from 'react';
import '../styles/fourZerofour.css';
import the404Img from '../assets/404.png';
import { Link } from 'react-router-dom';

export const FourZeroFour = () => {
  return (
    <div className="fourZeroFour">
      <div className="fourZeroFour-details">
        <img src={the404Img} alt="404" />
        <label className="fourZeroFour-error">
          The requested page does not exit
        </label>
        <Link className="fourZeroFour-link-to" to={'/'}>
          Home page
        </Link>
      </div>
    </div>
  );
};
