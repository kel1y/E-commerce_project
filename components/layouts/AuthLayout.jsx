import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../AuthNavBar';
import Slogan from '../Slogan';
import '../../styles/signup.css';

const AuthLayout = () => {
  return (
    <div className="auth-layout">
      <header>
        <Slogan />
        <NavBar />
      </header>
      <main className="auth-main-container">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
