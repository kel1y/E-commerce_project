import React from 'react';
import '../styles/bottomNavBar.css';
import home_SVG from '../assets/home.svg';
import loginbtm_SVG from '../assets/login-bottom.svg';
import userTick_SVG from '../assets/how_to_reg.svg';
import comment_SVG from '../assets/comment.svg';
import { Link } from 'react-router-dom';

const BottomNavBar = () => {
  return (
    <div className="bottomnav-container">
      <div className="links-container">
        <Link className='link' to={'#'}>
          <img src={home_SVG} />
        </Link>
        <Link className='link' to={'#'}>
          <img src={loginbtm_SVG} />
        </Link>
        <Link className='link' to={'#'}>
          <img src={userTick_SVG} />
        </Link>
        <Link className='link' to={'#'}>
          <img src={comment_SVG} />
        </Link>
      </div>
      <div className='the-bottom-line' />
    </div>
  );
};

export default BottomNavBar;
