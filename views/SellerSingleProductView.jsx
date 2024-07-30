import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import SellerProductDetail from '../components/SellerProductDetail.jsx';
import '../styles/SingleProductView.css';

import Up from '../assets/Icons/Up.svg';
import search from '../assets/Icons/search_dashboard.svg';
import truck from '../assets/Icons/truck.svg';
import wish from '../assets/Icons/wish.svg';
import expired from '../assets/Icons/expired.svg';
import bell from '../assets/Icons/bell.svg';
import avatar from '../assets/Icons/avatar.svg';
import Chev from '../assets/Icons/Chev.svg';
import { Sidebar } from '../components';
import { fetchSingleProduct } from '../redux/slices/sellerProducts.js';
import { useDispatch, useSelector } from 'react-redux';

const SellerSingleProductView = () => {
  return (
    <div className="seller-single-product">
      <div className="seller-single-product-container">
        <div className="single_product_seller_dashboard_header">
          <div className="all_products">
            <p className="all_products_title">
              <a href="/sellerDashboard">
                <img src={Chev} alt="arrow" />
              </a>
              All Products
            </p>
          </div>
          <div className="search_seller_dashboard">
            <form>
              <button className="search_seller_dashboard_btn" type="button">
                <img src={search} alt="search" />
              </button>
              <input
                type="text"
                name="search_field"
                className="search_dashboard"
                placeholder="Search"
              />
            </form>
          </div>
          <div className="icons_seller_dashboard">
            <div className="bell_seller_dashboard">
              <img src={bell} alt="" className="bell_icon_seller_dashboard" />
            </div>
            <div className="avatar_seller_dashboard">
              <img
                src={avatar}
                alt=""
                className="avatar_icon_seller_dashboard"
              />
            </div>
          </div>
        </div>

        <div className="single_product_cards">
          <div className="available">
            <img src={truck} alt="truck" />
            <p className="card_title">Available</p>
            <p className="card_number">67</p>
          </div>
          <div className="wished">
            <img src={wish} alt="truck" />

            <p className="card_title">Wished</p>
            <p className="card_number">09</p>
          </div>
          <div className="expired">
            <img src={expired} alt="truck" />
            <p className="card_title">Expired</p>
            <p className="card_number">35</p>
          </div>
        </div>
        <SellerProductDetail />
      </div>
    </div>
  );
};
export default SellerSingleProductView;
