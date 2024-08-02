import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetSingleProductQuery } from '../redux/slices/products';
import ProductDetail from '../components/ProductDetail';
import '../styles/SingleProductView.css';
import spinner from '../assets/Icons/spinner.svg';
import { getRecommendedProducts } from '../redux/slices/product/recommendedProduct';
import { fetchProducts } from '../redux/slices/LandingPage';
import { lazy, Suspense } from 'react';
import RecommendedProducts from '../components/product/RecommendedProducts';
import Reviews from '../components/Reviews';

const SingleProductView = () => {
  const { id } = useParams();
  const { isLoading, error, data } = useGetSingleProductQuery(id);
  let fetchedProduct  = useSelector(store => store.product)
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => { 
    dispatch(fetchProducts({page: currentPage, limit: 10 }))
  }, [])
  fetchedProduct = fetchedProduct.products?.filter(product => product.id !== id)

  if (isLoading || !data) {
    return (
      <div>
        <div className="go_back">
          <Link to="/" className="go_back_link">
            Go Back
          </Link>
        </div>
        <div className="single-products-container">
          <img
            className="single-spinner"
            src={spinner}
            style={{ height: '55px' }}
            alt="loader"
          />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-container">
        Oops!🙊🙊Something went wrong....
        <p>{error.message}</p>
      </div>
    );
  }
  return (
    <div>
      <div className="go_back">
        <Link to="/" className="go_back_link">
          Go Back
        </Link>
      </div>
      <div>
        <ProductDetail />
      </div>
      <div className='reviews-recommended-container'>
        <Reviews />
        <RecommendedProducts fetchedProduct={fetchedProduct} />
      </div>
    </div>
  );
};
export default SingleProductView;
