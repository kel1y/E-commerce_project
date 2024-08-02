import React from 'react';
import { Outlet } from 'react-router';
import Sidebar from './Sidebar';

const SellerLayout = () => {
  return (
    <div className="seller_layout" data-testid="sellerLayout" >
      <main className="">
        <Outlet />
      </main>
    </div>
  );
};

export default SellerLayout;
