import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../NavBar';
import Slogan from '../Slogan';
import Footer from '../Footer';

const Layout = () => {
  return (
    <div className="layout" data-testid='layout-test-id'>
    <header>
      <Slogan />
      <NavBar />
    </header>
    <main className="landingPage-main-container">
      <Outlet />
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
  );
};

export default Layout;
