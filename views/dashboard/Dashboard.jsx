import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardHeader from '../../components/DashboardHeader';
import truck from '../../assets/Icons/truck.svg';
import wish from '../../assets/Icons/wish.svg';
import expired from '../../assets/Icons/expired.svg';

import '../../styles/dashboard.css';
import ProductsTable from '../ProductsTable';
import getUserInfo from '../../utils/getUserInfo';
import { fetchSellerProducts } from '../../redux/slices/sellerProducts';

const Dashboard = () => {
  const [role, setRole] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const user = getUserInfo();
    if (user) {
      setRole(user.payload.role);
    }
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSellerProducts({ page: currentPage, limit: 10 }));
  }, [currentPage]);
  // const onPageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };
  const products = useSelector((state) => state.product);
  const productLength = products.products;

  return (
    <div className="seller-main-dashboard">
      <DashboardHeader text="dashboard" className="dash-text" />
      {role === 'seller' && (
        <>
          <div className="cards">
            <div className="available">
              <img src={truck} alt="truck" />
              <p className="card_title">Available</p>
              <p className="card_number">{productLength.length}</p>
            </div>
            <div className="wished">
              <img src={wish} alt="wish" />
              <p className="card_title">Wished</p>
              <p className="card_number">3</p>
            </div>
            <div className="expired">
              <img src={expired} alt="expired" />
              <p className="card_title">Expired</p>
              <p className="card_number">0</p>
            </div>
          </div>
          <ProductsTable />
        </>
      )}
    </div>
  );
};

export default Dashboard;
