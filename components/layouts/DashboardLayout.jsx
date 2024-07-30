import React from 'react';
import { Outlet } from 'react-router';
import  Sidebar  from '../Sidebar';
import '../../styles/productLayout.css';

 const DashboardLayout = () => {
  return (
    <div className="product-layout">
      <Sidebar />
      <div className="product-content">
        <main className="main-container">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
