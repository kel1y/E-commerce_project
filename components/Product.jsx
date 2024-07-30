/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useDispatch } from 'react-redux';
import { addCart } from '../redux/slices/cart/addCart';
import Heart from '../assets/Icons/Heart2.svg';
import Shop from '../assets/Icons/shop1.svg';
import { Link } from 'react-router-dom';
import { addProductToWishlist } from '../redux/slices/productWishlist/AddProductToWishlist';

const Product = ({ product: { id, images, productName, price } }) => {
  const dispatch = useDispatch();
  const handleAddCart = (itemId) => {
    dispatch(addCart(itemId));
  };

  const handleAddProductToWishlist = (itemId) => {
    dispatch(addProductToWishlist({ product_id: itemId }));
  }

  return (
    <div className="card-container-landing-page">
      <div className="product_image_icons">
        <img 
        src={Heart} 
        alt="Heart" 
        className="Heart" 
        onClick={() => handleAddProductToWishlist(id)}
        />
        <img
          src={Shop}
          alt="Shop"
          className="Shop"
          onClick={() => handleAddCart(id)}
        />
      </div>
      <Link className="product_link" to={`/products/${id}`}>
        <div className="product-card">
          <img
            src={images[0]}
            width={250}
            height={250}
            alt=""
            className="product-image"
          />

          <p className="product-name">{productName}</p>
          <p className="product-price">RWF{price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
