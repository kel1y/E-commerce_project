import React from 'react';
import { Outlet } from 'react-router';
import Slogan from '../Slogan';
import '../../styles/signup.css';

const SuccessLayout = () => {
  return (
    <div className="auth-layout">
      <header>
        <Slogan />
      </header>
      <main className="auth-main-container">
        <Outlet />
      </main>
    </div>
  );
};

export default SuccessLayout;
