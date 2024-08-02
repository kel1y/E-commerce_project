import React, { useEffect, useState } from 'react';
import {
  HeroBanner,
  HomeNavBar,
  Pagination,
  Product,
  SearchBar,
} from '../components';
import spinner from '../assets/Icons/spinner.svg';
import { fetchProducts } from '../redux/slices/LandingPage';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Chat from './chat/chat';

const LandingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const responseParam = new URLSearchParams(location.search).get('response');

  useEffect(() => {
    if (responseParam) {
      const parsedResponse = JSON.parse(responseParam);
      const token = parsedResponse.token;
      localStorage.setItem('token', token);

      // Remove the 'response' parameter from the URL
      const urlWithoutResponse = new URL(window.location.href);
      urlWithoutResponse.searchParams.delete('response');

      navigate(urlWithoutResponse.pathname + urlWithoutResponse.search, {
        replace: true,
      });
    }
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const products = useSelector((state) => state.product);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts({ page: currentPage, limit: 10 }));
  }, [currentPage]);
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div data-testid="landing-page">
      {/* <HomeNavBar data-testid="home-nav-bar" /> */}
      <HeroBanner data-testid="hero-banner" />
      <div className="products_list" data-testid="products_list">
        <h1 className="products_heading" data-testid="products-heading">
          OUR PRODUCTS
        </h1>
        {products?.loading ? (
          <div className="products-container" data-testid="products-container">
            <img
              src={spinner}
              style={{ height: '55px' }}
              alt="loader"
              data-testid="loader-container"
            />
          </div>
        ) : null}
        {products && !products.loading && (
          <div className="products-container" data-testid="products-container">
            {products?.products?.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        )}
        {!products.products && !products.loading && (
          <div className="products_heading  ">
            <h2>No Products Found</h2>
          </div>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={products.totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default LandingPage;
