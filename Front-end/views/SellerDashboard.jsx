import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PaginationDashboard, SellerProduct, Sidebar } from '../components';
import truck from '../assets/Icons/truck.svg';
import wish from '../assets/Icons/wish.svg';
import expired from '../assets/Icons/expired.svg';
import spinner from '../assets/Icons/spinner.svg';

import '../styles/SellerDashboard.css';
import { fetchSellerProducts } from '../redux/slices/sellerProducts';
import DashboardHeader from '../components/DashboardHeader';
import { getAllProductWishes } from '../redux/slices/productWishlist/getProductFromWishlist';

const SellerDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const products = useSelector((state) => state.product);
  const deleteStatus = useSelector((state) => state.productDelete);
  const availabilityStatus = useSelector((state) => state.productAvailability);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSellerProducts({ page: currentPage, limit: 10 }));
  }, [currentPage]);
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [wishCount, setWishCount] = useState(0); // State variable for wishlist count
  const { wishlist } = useSelector((state) => state.getAllProductWishes);
  useEffect(() => {
    dispatch(getAllProductWishes());
    setWishCount(wishlist ? wishlist.length : 0);
  }, [dispatch]);

  const productLength = products.products;
  return (
    <div className="seller_dashboard" data-testid="seller_dashboard">
      <div className="seller_dashboard_container">
        <DashboardHeader text="Products" className="total_products" />
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
        <div className="add_product">
          <button type="button" className="add_product_button">
            <a href="/dashboard/products/add">
              <span>+ </span>Add new product
            </a>
          </button>
        </div>
        {products?.loading ? (
          <div className="seller_products_list">
            <div className="seller-products-container">
              <img src={spinner} alt="loader" />
            </div>
            ;
          </div>
        ) : null}
        {products && !products.loading && (
          <div
            className="seller_products_list"
            data-testid="seller_products_list"
          >
            <div className="seller-products-container">
              {products?.products?.map((product) => (
                <SellerProduct key={product.id} product={product} />
              ))}
            </div>
            {!products.products && !products.loading && (
              <div className="seller-products-container">
                <h2 style={{ color: 'grey' }}>No Products Found</h2>
              </div>
            )}
          </div>
        )}
        <PaginationDashboard
          currentPage={currentPage}
          totalPages={products.totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default SellerDashboard;
