/* eslint-disable no-prototype-builtins */
import React from 'react'
import { useSelector } from 'react-redux'
import { Product } from '../components'
import Spinner from '../components/Spinner'
import '../styles/LandingPage.css'
import NotFound from "../utils/NotFound.jsx"

const SearchPage = () => {
  const { data, isLoading } = useSelector((store) => store.search);

  if (isLoading) {
    return (
      <div className="landing-page">
        <Spinner />
      </div>
    );
  }

  if (typeof data === 'string' || !data || data.hasOwnProperty('message')) {
    return <NotFound />
  }

  return (
    <div className="landing-page">
      <div className="products-container" data-testid="products-container">
        {data.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
export default SearchPage